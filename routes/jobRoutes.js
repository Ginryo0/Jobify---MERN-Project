import express from 'express';
const router = express.Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} from '../controllers/jobControllers.js';

import testUser from '../middleware/testUser.js';

router.route('/').post(testUser, createJob).get(getAllJobs);
// static route before dynamic(:id)
router.route('/stats').get(showStats);
router.route('/:id').delete(testUser, deleteJob).patch(testUser, updateJob);

export default router;
