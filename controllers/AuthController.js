import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomAPIError('Please provide all values');
  }

  const user = await User.create({ name, email, password });
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
