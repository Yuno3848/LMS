import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import User from '../models/auth.models.js';
import ApiResponse from '../utils/ApiResponse.js';
import { instructorProfile } from '../models/instructorProfile.model.js';

export const createInstructorProfile = asyncHandler(async (req, res) => {
  console;
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

export const updateInstructoProfile = asyncHandler(async (req, res) => {
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

  return res.status(200).json(new ApiResponse(200, 'instructor profile updated successfully'));
});

export const verifyInstructor = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId).populate('instructorProfile');
  if (!user) {
    throw new ApiError(404, 'user not found');
  }
  if (user.instructorProfile.isVerifiedInstructor === 'pending') {
    throw new ApiError(400, 'user instructor profile verificaiton  is in already in pending');
  }

  const updatedInstructorProfile = await instructorProfile.findByIdAndUpdate(
    user.instructorProfile,
    {
      $set: {
        isVerifiedInstructor: 'pending',
      },
    },
    {
      new: true,
    },
  );
  if (!updatedInstructorProfile) {
    throw new ApiError(404, 'instructor profile verified instructor status could not be updated');
  }

  const instructorDetails = await instructorProfile.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(user.instructorProfile) },
    },
    {
      $lookup: {
        from: 'users',
        foreignField: 'instructorProfile',
        localField: '_id',
        as: 'instructorDetails',
      },
    },
    {
      $unwind: '$instructorDetails',
    },
    {
      $project: {
        username: '$instructorDetails.username',
        email: '$instructorDetails.email',
        isEmailVerified: '$instructorDetails.isEmailVerified',
        isVerifiedInstructor: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, 'intructor verified successfully', instructorDetails));
});
