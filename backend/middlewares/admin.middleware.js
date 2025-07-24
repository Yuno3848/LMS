import ApiError from '../utils/ApiError.js';

export const adminRole = (req, res, next) => {
  const user = req.user;
  if (!user || user.role !== 'admin') {
    throw new ApiError(403, 'Access denied | Admin only!');
  }
  next();
};
