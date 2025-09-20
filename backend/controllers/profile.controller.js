import User from '../models/auth.models.js';
import { studentProfile } from '../models/studentProfile.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
export const createStudentProfile = async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
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

  if (!newStudentProfile) {
    throw new ApiError(400, 'failed to create student profile');
  }

  user.studentProfile = newStudentProfile._id;
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, 'Student profile created successfully', newStudentProfile));
};

export const updatedStudentProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  console.log('user id', userId);
  if (!userId) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId).populate('studentProfile');
  if (!user) {
    throw new ApiError(404, 'user not found');
  }

  if (!user.studentProfile) {
    throw new ApiError(404, 'student profile not found');
  }

  const { bio, skills, socialLinks, education, interests } = req.body;

  console.log(req.body);
  const updatedProfile = await studentProfile.findByIdAndUpdate(
    user.studentProfile._id,
    { $set: { bio, skills, socialLinks, education, interests } },
    { new: true, runValidators: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, 'Student profile updated successfully', updatedProfile));
});

export const verifyStudentProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId).populate('studentProfile');

  if (!user) {
    throw new ApiError(404, 'user not found');
  }
  if (user.studentProfile.verificationStatus === 'pending') {
    throw new ApiError(400, 'user student profile verification is in already in pending');
  }

  const updatedStudentProfile = await studentProfile.findByIdAndUpdate(
    user.studentProfile._id,

    {
      $set: { verificationStatus: 'pending' },
    },
    {
      new: true,
    },
  );
  if (!updatedStudentProfile) {
    throw new ApiError(404, 'student profile verified student status could not be updated');
  }

  const studentProfileDetails = await studentProfile.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(user.studentProfile),
      },
    },
    {
      $lookup: {
        from: 'users',
        foreignField: 'studentProfile',
        localField: '_id',
        as: 'studentProfileDetails',
      },
    },
    {
      $unwind: '$studentProfileDetails',
    },
    {
      $project: {
        username: '$studentProfileDetails.username',
        role: '$studentProfileDetails.role',
        email: '$studentProfileDetails.email',
        isEmailVerified: '$studentProfileDetails.isEmailVerified',
        isVerifiedStudent: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'student profile verification sent successfully', studentProfileDetails),
    );
});

export const getStudentProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    throw new ApiError(401, 'User not authorized');
  }

  const studentProfile = await User.findById(userId);

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
          verificationStatus: '$studentProfile.verificationStatus',
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, 'student profile successfully', customStudentProfile));
});

export const getStudentProfileById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    throw new ApiError(401, 'User not authorized');
  }

  const studentProfile = await User.findById(userId).populate('studentProfile');
  if (!studentProfile) {
    throw new ApiError(404, 'student profile not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'student profile successfully', studentProfile.studentProfile));
});

// export const getAllStudentProfiles = asyncHandler(async (req, res) => {
//   const studentProfiles = await User.aggreate([
//     {
//       $lookup: {
//         from: 'studentprofiles',
//         localField: 'studentProfile',
//         foreignField: '_id',
//         as: 'studentProfile',
//       },
//     },
//     {
//       $unwind: '$studentProfile',
//     },
//     {
//       $project: {
//         _id: 1,
//         username: 1,
//         email: 1,
//         studentProfile: {
//           bio: '$studentProfile.bio',
//           skills: '$studentProfile.skills',
//           socialLinks: '$studentProfile.socialLinks',
//           education: '$studentProfile.education',
//           interests: '$studentProfile.interests',
//           isVerifiedStudent: '$studentProfile.isVerifiedStudent',
//         },
//       },
//     },
//   ]);

//   if (!studentProfiles || studentProfiles.length === 0) {
//     throw new ApiError(404, 'No student profiles found');
//   }
//   return res
//     .status(200)
//     .json(new ApiResponse(200, 'All student profiles retrieved successfully', studentProfiles));
// });
