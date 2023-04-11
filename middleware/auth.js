import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === '643596cd62f71573aaa74304';

    req.user = { userId: payload.userId, testUser };
    next();
  } catch (err) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

export default auth;
