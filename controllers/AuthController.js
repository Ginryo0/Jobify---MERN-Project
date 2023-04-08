import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import {
  UnprocessableEntityError,
  UnAuthenticatedError,
} from '../errors/index.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // catching errors in controllers
  if (!name || !email || !password) {
    throw new UnprocessableEntityError('Please provide all values');
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new UnprocessableEntityError('Email already in use.');
  }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    location: user.location,
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      location: user.location,
    },
    token,
  });
  // errors will be caught automatically by express-async-errors
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new UnprocessableEntityError('Please provide all values');
  }
  // will need to select +password to include it in the document
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }
  const PwMatch = await user.comparePassword(password);

  if (!PwMatch) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();
  // omit user from user obj sent to client
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
const updateUser = async (req, res) => {
  res.send('update user');
};

export { register, login, updateUser };
