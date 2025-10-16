import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import User from '../models/auth.models.js';
import { Course } from '../models/course.model.js';
import ApiResponse from '../utils/ApiResponse.js';

const validateInstructor = async (userId) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId).populate('instructorProfile');
  if (!user || user.role.toLowerCase() !== 'instructor') {
    throw new ApiError(403, 'Access denied | Instructor only!');
  }
  if (!user.instructorProfile) {
    throw new ApiError(400, 'Instructor profile not found');
  }

  return user;
};

export const createCourse = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await validateInstructor(userId);

  // Validate required fields
  const requiredFields = ['title', 'description', 'base', 'currency', 'category', 'requirements'];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    throw new ApiError(400, `Missing required fields: ${missingFields.join(', ')}`);
  }

  const {
    title,
    description,
    base,
    currency,
    difficulty,
    tags,
    category,
    requirements,
  } = req.body;

  // Validate thumbnail
  if (!req.file || !req.file.buffer) {
    throw new ApiError(400, 'Course thumbnail is required');
  }

  const thumbnail = await uploadOnCloudinary(req.file.buffer);
  if (!thumbnail?.secure_url) {
    throw new ApiError(500, 'Failed to upload thumbnail');
  }

  const courseData = {
    title,
    description,
    price: {
      base: Number(base),
      final: Number(base),
      currency,
    },
    difficulty,
    tags: Array.isArray(tags) ? tags : tags?.split(',').map((tag) => tag.trim()),
    category,
    requirements,
    thumbnail: {
      url: thumbnail.secure_url,
      localPath: req.file.public_id,
    },
    instructor: userId,
  };

  const newCourse = await Course.create(courseData);

  // Update instructor profile
  user.instructorProfile.courses.push(newCourse._id);
  await user.instructorProfile.save();

  return res.status(201).json(new ApiResponse(201, 'Course created successfully', newCourse));
});

export const getAllCourses = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  await validateInstructor(userId);

  const courses = await Course.aggregate([
    {
      $match: {
        instructor: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'instructor',
        foreignField: '_id',
        as: 'instructor',
      },
    },
    {
      $unwind: '$instructor',
    },
    {
      $project: {
        title: 1,
        description: 1,
        price: 1,
        isPublished: 1,
        category: 1,
        thumbnail: 1,
        'instructor.username': 1,
      },
    },
  ]);

  return res.status(200).json(new ApiResponse(200, 'Courses fetched successfully', courses));
});

export const getCourseById = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  await validateInstructor(userId);

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course ID');
  }

  const course = await Course.findById(courseId).populate('instructor', 'username email').lean();

  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  // Verify course ownership
  if (course.instructor._id.toString() !== userId) {
    throw new ApiError(403, 'Access denied: You do not own this course');
  }

  return res.status(200).json(new ApiResponse(200, 'Course fetched successfully', course));
});

export const isPublish = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course ID');
  }

  const user = await validateInstructor(userId);

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  // Verify course ownership
  if (course.instructor.toString() !== userId) {
    throw new ApiError(403, 'You do not have permission to publish this course');
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    { isPublished: true },
    {
      new: true,
      select: 'title description isPublished category',
    },
  );

  return res.status(200).json(new ApiResponse(200, 'Course published successfully', updatedCourse));
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course ID');
  }

  const user = await validateInstructor(userId);

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  // Verify course ownership
  if (course.instructor.toString() !== userId) {
    throw new ApiError(403, 'You do not have permission to delete this course');
  }

  // Delete course and update instructor profile
  await Course.findByIdAndDelete(courseId);
  user.instructorProfile.courses = user.instructorProfile.courses.filter(
    (id) => id.toString() !== courseId,
  );
  await user.instructorProfile.save();

  return res.status(200).json(new ApiResponse(200, 'Course deleted successfully'));
});
