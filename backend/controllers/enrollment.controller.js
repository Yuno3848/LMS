import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import mongoose from 'mongoose';
import User from '../models/auth.models.js';
import { Enrollment } from '../models/enrollment.model.js';
import { Transaction } from '../models/transaction.model.js';

export const getUserEnrollments = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const enrollment = await Enrollment.findOne({ studentId: userId }).populate({
    path: 'studentId',
    select:
      '-password -emailVerifiedToken -emailVerificationTokenExpiry -forgotPasswordExpiry -forgotPasswordToken -refreshToken -createdAt -updatedAt -studentProfile -instructorProfile',
  });

  if (!enrollment) {
    throw new ApiError(404, 'Enrollment history not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Enrollment history found successfully', enrollment));
});

export const getDetailedUserEnrollments = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const enrollment = await Enrollment.find({ studentId: userId }).populate([
    {
      path: 'studentId',
      select:
        '-password -emailVerifiedToken -emailVerificationTokenExpiry -forgotPasswordExpiry -forgotPasswordToken -refreshToken -createdAt -updatedAt -studentProfile -instructorProfile',
    },
    {
      path: 'courseIds',
      select: 'title description thumbnail tags itemSection instructor',
      populate: [
        {
          path: 'instructor',
          select: 'username -_id',
        },
        {
          path: 'itemSection',
          select: 'title totalLectures subItemSection',
          populate: {
            path: 'subItemSection',
            select: '-createdAt -updatedAt -_id',
          },
        },
      ],
    },
  ]);

  if (!enrollment) {
    throw new ApiError(404, 'Enrollment history not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Enrollment history found successfully', enrollment));
});

export const getEnrolledCourseByCourseId = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const { courseIds } = req.params;

  const isEnrolled = await Enrollment.populate({});
});

export const getAllUserEnrollment = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId).populate('instructorProfile');
  if (!user || user.role.toLowerCase() !== 'instructor') {
    throw new ApiError(403, 'Access denied | Instructor only!');
  }
});

// export const getItemSectionProgress = asyncHandler(async (req, res) => {});
// export const getSubItemSectionProgress = asyncHandler(async (req, res) => {});
export const checkEnrollment = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course ID');
  }

  const enrollment = await Enrollment.findOne({ studentId: userId, courseId });

  if (!enrollment) {
    return res
      .status(200)
      .json(new ApiResponse(200, 'User is not enrolled in this course', { enrolled: false }));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'User is enrolled in this course', { enrolled: true, enrollment }));
});
