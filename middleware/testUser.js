import { UnAuthorizedError } from '../errors/index.js';

const testUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new UnAuthorizedError('Test User. Read Only!');
  }
  next();
};

export default testUser;
