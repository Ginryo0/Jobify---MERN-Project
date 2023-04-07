import User from '../models/User.js';

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ msg: 'Creating user failed' });
  }
};
const login = async (req, res) => {
  res.send('Login user');
};
const updateUser = async (req, res) => {
  res.send('update user');
};

export { register, login, updateUser };
