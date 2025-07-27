import User from '../models/auth.models.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler.js';
import { instructorProfile } from '../models/instructorProfile.model.js';
import { studentProfile } from '../models/studentProfile.model.js';

export const showPendingInstructorRole = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId);

  if (!user || user.role.toLowerCase() !== 'admin') {
    throw new ApiError(403, 'Access denied | Admin only!');
  }

  const users = await User.find({ instructorProfile: { $exists: true, $ne: null } })
    .populate({
      path: 'instructorProfile',
      match: { isVerifiedInstructor: 'pending' },
    })
    .select('username role email instructorProfile');

  //match can be fail and the mongoose will still return the User and set the user.instructorProfile = null ->{isVerifiedInstructor : verified } so we will filtered out which are null

  const filteredInstructor = users.filter((user) => user.instructorProfile !== null);

  if (filteredInstructor.length === 0) {
    throw new ApiError(404, 'No pending request found!');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'pending instructor role fetched successfully', filteredInstructor));
});

export const verifyInstructorById = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { instructorId } = req.params;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId);

  if (!user || user.role.toLowerCase() !== 'admin') {
    throw new ApiError(403, 'Access denied | Admin only!');
  }

  const instructor = await User.findById(instructorId).populate('instructorProfile');
  if (!instructor) {
    throw new ApiError(404, 'instructor not found');
  }

  if (
    instructor.role === 'instructor' ||
    instructor.instructorProfile.isVerifiedInstructor === 'verified'
  ) {
    throw new ApiError(400, 'User is already a verified instructor');
  }

  instructor.role = 'instructor';
  instructor.instructorProfile.isVerifiedInstructor = 'verified';

  await instructor.save();
  await instructor.instructorProfile.save();

  return res.status(200).json(new ApiResponse(200, 'instructor verified successfully', instructor));
});

export const deleteInstructorProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { instructorId } = req.params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId);

  if (!user || user.role.toLowerCase() !== 'admin') {
    throw new ApiError(403, 'Access denied | Admin only!');
  }

  const instructor = await User.findById(instructorId);
  if (!instructor) {
    throw new ApiError(404, 'Instructor not found');
  }

  const profile = await instructorProfile.findByIdAndDelete(instructor.instructorProfile);
  if (!profile) {
    throw new ApiError(404, 'Instructor profile not found or already deleted');
  }
  instructor.instructorProfile = undefined;
  await instructor.save();

  return res.status(200).json(new ApiResponse(200, 'Instructor profile deleted successfully'));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { userIdDelete } = req.params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  if (!mongoose.Types.ObjectId.isValid(userIdDelete.toString())) {
    throw new ApiError(404, 'user id is valid');
  }

  const user = await User.findById(userId);

  if (!user || user.role.toLowerCase() !== 'admin') {
    throw new ApiError(403, 'Access denied | Admin only!');
  }

  const deletedUser = await User.findById(userIdDelete);
  if (!deletedUser) {
    throw new ApiError(404, 'User not found');
  }

  if (deletedUser.studentProfile) {
    await studentProfile.findByIdAndDelete(deletedUser.studentProfile);
  }

  if (deletedUser.instructorProfile) {
    await instructorProfile.findByIdAndDelete(deletedUser.instructorProfile);
  }
  await User.findByIdAndDelete(userIdDelete);
  return res.status(200).json(new ApiResponse(200, 'User deleted successfully'));
});
