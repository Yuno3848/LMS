import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import mongoose from 'mongoose';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import User from '../models/auth.models.js';
import { courseSection } from '../models/courseSection.model.js';

export const createCourseSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const isInstructor = await User.findById(userId);
  if (!isInstructor || isInstructor.role.toLowerCase() !== 'instructor') {
    throw new ApiError(403, 'Access denied || Insutrctor Only');
  }

  const { courseId } = req.params;
  const course = await Course.findById(courseId);





  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const { description, requirements } = req.body;

  const thumbnailAvatarPath = req.file?.path || null;

  if (!thumbnailAvatarPath) {
    throw new ApiError(400, 'thumbnail avatar required');
  }

  const thumbnailAvatar = await uploadOnCloudinary(thumbnailAvatarPath);

  if (!thumbnailAvatar) {
    throw new ApiError(500, 'Failed to upload avatar');
  }

  const newCourseSection = await courseSection.create({
    description,
    thumbnail: {
      url: thumbnailAvatar.url,
      localPath: thumbnailAvatarPath,
    },
    requirements,
  });
});

export const updateCourseSection = asyncHandler(async (Request, res) => {});
