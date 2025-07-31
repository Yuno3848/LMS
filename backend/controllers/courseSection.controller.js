import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import mongoose from 'mongoose';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import User from '../models/auth.models.js';
import { courseSection } from '../models/courseSection.model.js';
import { Course } from '../models/course.model.js';

export const createCourseSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not Authorized');
  }

  const isInstructor = await User.findById(userId);

  if (!isInstructor || isInstructor.role !== 'instructor') {
    throw new ApiError(403, 'Access denied || Instructor Only!');
  }

  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  if (course.instructor.toString() !== userId) {
    throw new ApiError(403, 'Access denied - You can only add sections to your own courses');
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
    title: course.title,
    description,
    thumbnail: {
      url: thumbnailAvatar.url,
      localPath: thumbnailAvatarPath,
    },
    requirements,
  });

  course.courseSection.push(newCourseSection._id);
  await course.save();

  return res.status(200).json(new ApiResponse(200, 'course section created', newCourseSection));
});

export const updateCourseSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const isInstructor = await User.findById(userId);
  if (!isInstructor || isInstructor.role !== 'instructor') {
    throw new ApiError(403, 'Access denied - Instructor only');
  }

  const { courseId, courseSectionId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  if (course.instructor.toString() !== userId) {
    throw new ApiError(403, 'Access denied - You can only update your own course sections');
  }

  if (!course.courseSection.includes(courseSectionId)) {
    throw new ApiError(404, 'Invalid course section ID for this course');
  }

  const { description, requirements } = req.body;

  const thumbnailAvatarPath = req.file?.path;
  if (!thumbnailAvatarPath) {
    throw new ApiError(400, 'Thumbnail avatar is required');
  }

  const thumbnailAvatar = await uploadOnCloudinary(thumbnailAvatarPath);
  if (!thumbnailAvatar) {
    throw new ApiError(500, 'Failed to upload avatar');
  }

  const courseSectionDoc = await courseSection.findById(courseSectionId);
  if (!courseSectionDoc) {
    throw new ApiError(404, 'Course section not found');
  }

  courseSectionDoc.description = description;
  courseSectionDoc.thumbnail = {
    url: thumbnailAvatar.url,
    localPath: thumbnailAvatarPath,
  };
  courseSectionDoc.requirements = requirements;

  await courseSectionDoc.save();

  return res
    .status(200)
    .json(new ApiResponse(200, 'Course section updated successfully', courseSectionDoc));
});

export const deleteCourseSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not Authorized');
  }
  const instructor = await User.findById(userId);
  if (!instructor || instructor.role !== 'instructor') {
    throw new ApiError(403, 'Access denied || Instructor Only!');
  }

  const { courseId, courseSectionId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'course not found');
  }

  if (course.instructor.toString() !== userId) {
    throw new ApiError(403, 'Access Denied - you can only delete your own course section ');
  }
  const isCourseSection = await courseSection.findById(courseSectionId);

  if (!isCourseSection) {
    throw new ApiError(404, 'course section not found.');
  }

  if (!course.courseSection.includes(courseSectionId)) {
    throw new ApiError(404, 'Invalid course section id for this course');
  }

  course.courseSection = course.courseSection.filter(
    (sectionId) => sectionId.toString() !== courseSectionId,
  );
  await course.save();
  await courseSection.findByIdAndDelete(courseSectionId);
  return res.status(200).json(new ApiResponse(200, 'course section deleted successfully'));
});

export const getAllCourseSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not Authorized');
  }
  const instructor = await User.findById(userId);
  if (!instructor || instructor.role !== 'instructor') {
    throw new ApiError(403, 'Access denied || Instructor Only!');
  }

  const course = await Course.aggregate([
    {
      $match: {
        instructor: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: 'coursesections',
        foreignField: '_id',
        localField: 'courseSection',
        as: 'sectionDetails',
      },
    },
    {
      $unwind: '$sectionDetails',
    },
    {
      $group: {
        _id: '$_id',
        title: { $first: '$title' },
        sections: {
          $push: {
            sectionId: '$sectionDetails._id',
            description: '$sectionDetails.description',
            requirements: '$sectionDetails.requirements',
            thumbnail: '$sectionDetails.thumbnail',
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        sections: 1,
      },
    },
  ]);

  if (!course.length) {
    throw new ApiError(404, 'No course sections found', []);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'All course sections fetched successfully', course));
});

export const getCourseSectionById = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not Authorized');
  }
  const instructor = await User.findById(userId);
  if (!instructor || instructor.role !== 'instructor') {
    throw new ApiError(403, 'Access denied || Instructor Only!');
  }

  const { courseId, courseSectionId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'course not found');
  }

  if (course.instructor.toString() !== userId) {
    throw new ApiError(403, 'Access Denied - you can only fetch your own course section ');
  }

  const CourseSection = await courseSection.findById(courseSectionId).lean();

  if (!CourseSection) {
    throw new ApiError(404, 'Course section not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'course section fetched successfully', CourseSection));
});
