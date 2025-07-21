import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import User from '../models/auth.models.js';
import { Course } from '../models/course.model.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createCourse = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not Authorized');
  }

  const user = await User.findById(userId).populate('instructorProfile');
  if (!user || !user.instructorProfile) {
    throw new ApiError(400, 'Instructor profile not found');
  }
  const { title, description, price, courseExpiry, difficulty, tags, category } = req.body;

  const thumbnailAvatarPath = req.file?.path || null;

  if (!thumbnailAvatarPath) {
    throw new ApiError(400, 'thumbnail avatar required');
  }

  const avatar = await uploadOnCloudinary(thumbnailAvatarPath);
  console.log('Avatar', avatar);
  if (!avatar) {
    throw new ApiError(500, 'Failed to upload avatar');
  }

  const newCourse = await Course.create({
    title,
    description,
    price: {
      base: JSON.parse(price.base),
      final: JSON.parse(price.final),
      currency: price.currency,
    },
    courseExpiry,
    difficulty,
    tags,
    category,
    thumbnail: {
      url: avatar.url,
      localPath: thumbnailAvatarPath,
    },
  });
  console.log('new course', newCourse);
  user.instructorProfile.courses.push(newCourse._id);
  await user.instructorProfile.save();

  return res
    .status(201)
    .json(new ApiResponse(201, 'course created and added to the instructor profile'));
});
