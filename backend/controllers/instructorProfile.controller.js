import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import User from '../models/auth.models.js';
import ApiResponse from '../utils/ApiResponse.js';
import { instructorProfile } from '../models/instructorProfile.model.js';

export const createInstructorProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const { bio, expertise, socialLinks, rating } = req.body;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.instructorProfile) {
    throw new ApiError(400, 'Instructor profile already exists');
  }

  const instructor = await instructorProfile.create({
    bio,
    expertise,
    socialLinks,
    rating,
    instructorId: userId,
  });

  if (!instructor) {
    throw new ApiError(404, 'instructor profile not created');
  }

  user.instructorProfile = instructor._id;
  await user.save();
  return res
    .status(201)
    .json(new ApiResponse(201, 'instructor profile created successfully', instructor));
});

export const updateInstructorProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId);

  if (!user.instructorProfile) {
    throw new ApiError(404, 'instructor profile not found');
  }
  const { bio, expertise, socialLinks, rating } = req.body;

  const updatedInstructorProfile = await instructorProfile.findByIdAndUpdate(
    user.instructorProfile._id,
    {
      bio,
      expertise,
      socialLinks,
      rating,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!updatedInstructorProfile) {
    throw new ApiError(404, 'instructor profile could not be updated');
  }

  const instructorDetails = await User.findById(userId)
    .populate('instructorProfile')
    .select(
      '-emailVerifiedToken -emailVerificationTokenExpiry -forgotPasswordExpiry -forgotPasswordToken -refreshToken',
    );

  return res
    .status(200)
    .json(new ApiResponse(200, 'instructor profile updated successfully', instructorDetails));
});

export const reqInstructorRole = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId)
    .populate('instructorProfile')
    .select('username email role instructorProfile');
  if (!user) {
    throw new ApiError(400, 'User not found');
  }

  if (!user.instructorProfile) {
    throw new ApiError(
      409,
      'Instructor profile not found. Please create one before requesting instructor role',
    );
  }

  if (user.instructorProfile.isVerifiedInstructor === 'pending') {
    throw new ApiError(409, 'request already pending');
  }

  if (user.instructorProfile.isVerifiedInstructor === 'verified') {
    throw new ApiError(409, 'Already verified');
  }

  if (user.instructorProfile.isVerifiedInstructor === 'rejected') {
    user.instructorProfile.isVerifiedInstructor = 'pending';
    await user.instructorProfile.save();
    return res
      .status(200)
      .json(new ApiResponse(200, 'Re-submitted instructor request successfully', user));
  }

  user.instructorProfile.isVerifiedInstructor = 'pending';
  await user.instructorProfile.save();

  return res
    .status(200)
    .json(new ApiResponse(200, 'instructor request submitted successfully', user));
});

export const getInstructorProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const instructorDetails = await instructorProfile.findOne({ instructorId: userId });

  if (!instructorDetails) {
    throw new ApiError(404, 'Instructor Details not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Instructor profile fetched successfully', instructorDetails));
});
