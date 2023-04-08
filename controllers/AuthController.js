import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { UnprocessableEntityError } from '../errors/index.js';

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
  res.send('Login user');
};
const updateUser = async (req, res) => {
  res.send('update user');
};

export { register, login, updateUser };
