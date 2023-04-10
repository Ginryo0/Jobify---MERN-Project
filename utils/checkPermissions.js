import { UnAuthorizedError } from '../errors/index.js';

const checkPermissions = (reqUser, resourceUserId) => {
  // if (reqUser.role === 'admin') return
  if (reqUser.userId === resourceUserId.toString()) return;
  throw new UnAuthorizedError('Not Authorized to access this route');
};

export default checkPermissions;
