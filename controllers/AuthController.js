import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
  // errors will be caught automatically by express-async-errors
};
const login = async (req, res) => {
  res.send('Login user');
};
const updateUser = async (req, res) => {
  res.send('update user');
};

export { register, login, updateUser };
