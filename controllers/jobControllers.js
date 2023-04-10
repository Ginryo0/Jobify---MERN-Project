import { StatusCodes } from 'http-status-codes';
import {
  UnprocessableEntityError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js';

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
  const jobs = await Job.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
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

  // we do findOneAndUpdate -> to save our time by updating fields manually & run validators again
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
  res.send('showStats');
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
