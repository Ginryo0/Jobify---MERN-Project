import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  const token = authHeader.split(' ')[1];
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
