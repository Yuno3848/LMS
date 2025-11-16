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

  const requiredFields = ['title', 'description', 'base', 'category', 'requirements'];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    throw new ApiError(400, `Missing required fields: ${missingFields.join(', ')}`);
  }

  const { title, description, base,  difficulty, tags, category, requirements } = req.body;

  // Validate thumbnail
  if (!req.file || !req.file.buffer) {
    throw new ApiError(400, 'Course thumbnail is required');
  }

  const thumbnail = await uploadOnCloudinary(req.file.buffer, req.file.originalname);
  if (!thumbnail?.secure_url) {
    throw new ApiError(500, 'Failed to upload thumbnail');
  }

  const courseData = {
    title,
    description,
    price: {
      base: Number(base),
      final: Number(base),
      currency : "INR"
    },
    difficulty,
    tags: Array.isArray(tags) ? tags : tags?.split(',').map((tag) => tag.trim()),
    category,
    requirements,
    thumbnail: {
      url: thumbnail.secure_url,
      localPath: thumbnail.public_id,
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




export const getCourseWithInstructorPipeline = async (courseId) => {
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new Error('Invalid course ID');
  }

  const course = await Course.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(courseId) },
    },
    {
      $lookup: {
        from: 'users', // collection name of User model
        localField: 'instructor',
        foreignField: '_id',
        as: 'instructor',
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              fullname: 1,
              email: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: '$instructor',
    },
    {
      $lookup: {
        from: 'itemsections', // collection name of ItemSection model
        localField: 'itemSection',
        foreignField: '_id',
        as: 'itemSection',
        pipeline: [
          {
            $lookup: {
              from: 'subitemsections', // collection name of SubItemSection model
              localField: 'subItemSection',
              foreignField: '_id',
              as: 'subItemSection',
            },
          },
        ],
      },
    },
  ]);

  return course[0]; // return single object instead of array
};




export const getCourseById = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await getCourseWithInstructorPipeline(courseId);

  if (!course) {
    throw new ApiError(404, 'Course not found');
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

export const showCourses = asyncHandler(async (req, res) => {
  const course = await Course.find();

  return res.status(200).json(new ApiResponse(200, 'Fetched All Courses', course));
});

export const getCourseByInstructorId = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  await validateInstructor(userId);

  const instructorObjectId = new mongoose.Types.ObjectId(userId);

  const instructorCourses = await Course.aggregate([
    {
      $match: { instructor: instructorObjectId },
    },
    // Join with instructor profile
    {
      $lookup: {
        from: 'instructorprofiles',
        localField: 'instructor',
        foreignField: 'instructorId',
        as: 'instructorProfile',
      },
    },
    { $unwind: { path: '$instructorProfile', preserveNullAndEmptyArrays: true } },

    // Join with instructor (user data)
    {
      $lookup: {
        from: 'users',
        localField: 'instructor',
        foreignField: '_id',
        as: 'instructorDetails',
      },
    },
    { $unwind: { path: '$instructorDetails', preserveNullAndEmptyArrays: true } },

    // Join item sections if needed
    {
      $lookup: {
        from: 'itemsections',
        localField: 'itemSection',
        foreignField: '_id',
        as: 'itemSections',
      },
    },

    // You can also project only what’s needed
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        category: 1,
        tags: 1,
        difficulty: 1,
        isPublished: 1,
        thumbnail: 1,
        price: 1,
        createdAt: 1,
        'instructorDetails.username': 1,
        'instructorDetails.fullname': 1,
        'instructorProfile.bio': 1,
        'instructorProfile.expertise': 1,
        itemSections: 1,
      },
    },
  ]);

  if (!instructorCourses.length) {
    throw new ApiError(404, 'Instructor courses not found by id');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Instructor courses found successfully', instructorCourses));
});
