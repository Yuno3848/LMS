import User from '../models/Users/auth.models.js';
import { studentProfile } from '../models/Users/authSchema/studentProfile.schema.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
export const createStudentProfile = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    throw new ApiError(401, 'User not authenticated');
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.studentProfile) {
    throw new ApiError(400, 'Student profile already exists');
  }

  const { bio, skills, socialLinks, education, interests } = req.body;

  const newStudentProfile = await studentProfile.create({
    bio,
    skills,
    socialLinks,
    education,
    interests,
  });

  user.studentProfile = newStudentProfile._id;
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, 'Student profile created successfully', newStudentProfile));
};

export const updatedStudentProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    throw new ApiError(401, 'User not authrozied');
  }

  const user = await User.findById(userId).populate('studentProfile');
  if (!user) {
    throw new ApiError(404, 'user not found');
  }

  if (!user.studentProfile) {
    throw new ApiError(404, 'student profile not found');
  }

  const { bio, skills, socialLinks, education, interests } = req.body;

  const updatedProfile = await studentProfile.findByIdAndUpdate(
    user.studentProfile._id,
    {
      bio,
      skills,
      socialLinks,
      education,
      interests,
    },
    { new: true, runValidators: true },
  );
  return res
    .status(200)
    .json(new ApiResponse(200, 'Student profile updated successfully', updatedProfile));
});

export const getStudentProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(401, 'User not authorized');
  }

  const studentProfile = await User.findById(userId).populate('studentProfile');

  if (!studentProfile) {
    throw new ApiError(404, 'student profile not found');
  }

  const customStudentProfile = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: 'studentprofiles',
        localField: 'studentProfile',
        foreignField: '_id',
        as: 'studentProfile',
      },
    },
    {
      $unwind: '$studentProfile',
    },
    {
      $project: {
        _id: 1,
        username: 1,
        email: 1,
        studentProfile: {
          bio: '$studentProfile.bio',
          skills: '$studentProfile.skills',
          socialLinks: '$studentProfile.socialLinks',
          education: '$studentProfile.education',
          interests: '$studentProfile.interests',
          isVerifiedStudent: '$studentProfile.isVerifiedStudent',
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, 'student profile successfully', customStudentProfile));
});
