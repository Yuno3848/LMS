import ApiError from '../utils/ApiError.js';

export const instructorRole = (req, res, next) => {
  const user = req.user;
  if (!user || user.role !== 'instructor') {
    throw new ApiError(403, 'Access denied | Instructor only!');
  }
};
