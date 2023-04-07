import express from 'express';
const router = express.Router();

import { register, login, updateUser } from '../controllers/AuthController.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/update-user').patch(updateUser);

export default router;
