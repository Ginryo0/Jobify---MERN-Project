import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import {
  UnprocessableEntityError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js';
import moment from 'moment';

import Job from '../models/Job.js';
import checkPermissions from '../utils/checkPermissions.js';

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new UnprocessableEntityError('Please provide all values');
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
  let { search, status, jobType, sort, page, limit } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status && status !== 'all') {
    queryObject.status = status;
  }

  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  if (search) {
    // regex -> will look if position includes search query
    // options i = case insensitive
    queryObject.position = { $regex: search, $options: 'i' };
  }

  let promise = Job.find(queryObject);

  // sorting
  if (sort === 'latest') {
    // - = descending
    promise = promise.sort('-createdAt');
  } else if (sort === 'oldest') {
    promise = promise.sort('createdAt');
  } else if (sort === 'a-z') {
    promise = promise.sort('position');
  } else if (sort === 'z-a') {
    promise = promise.sort('-position');
  }

  // pagination logic
  page = +page || 1;
  limit = +limit || 10;
  const skip = (page - 1) * limit;
  promise = promise.skip(skip).limit(limit);

  const jobs = await promise;

  // totalJobs and numOfPages for pagination
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { position, company } = req.body;

  if (!position || !company) {
    throw new UnprocessableEntityError('Please provide all values');
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job was found with id :${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job was found with id :${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await Job.deleteOne({ _id: job._id });
  res.status(StatusCodes.OK).json({ msg: 'Success! Job deleted' });
};
const showStats = async (req, res) => {
  // match createdBy =  mongoose.Type.ObjectId - ObjectId withoutTypes creates a schema or smth like this
  // group them by status and count them
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  // reduce data in array into an object
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    // -1 = descending
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 12 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      // month - 1 cuz moment goes 0 - 11
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    // reverse -> reverse array in place
    .reverse();
  res.status(StatusCodes.OK).json({ stats: defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
