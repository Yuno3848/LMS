import User from '../models/auth.models.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

import { asyncHandler } from '../utils/asyncHandler.js';

export const showPendingInstructorRole = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }
  const users = await User.find({ instructorProfile: { $exists: true, $ne: null } })
    .populate({
      path: 'instructorProfile',
      match: { isVerifiedInstructor: 'pending' },
    })
    .select('username role email instructorProfile');

  //match can be fail and the mongoose will still return the User and set the user.instructorProfile = null ->{isVerifiedInstructor : verified } so we will filtered out which are null

  const filteredInstructor = users.filter((user) => user.instructorProfile !== null);

  if (!filteredInstructor.length === 0) {
    throw new ApiError(404, 'No pending request found!');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'pending instructor role fetched successfully', filteredInstructor));
});
