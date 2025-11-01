import mongoose from 'mongoose';
import User from '../models/auth.models.js';
import { Course } from '../models/course.model.js';
import { ItemSection } from '../models/itemSection.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createItemSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.params;

  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course ID');
  }

  const instructor = await User.findById(userId);
  if (!instructor || instructor.role !== 'instructor') {
    throw new ApiError(403, 'Access Denied | Instructor Only');
  }

  const course = await Course.findOne({
    _id: courseId,
    instructor: userId,
  });

  if (!course) {
    throw new ApiError(404, 'Course not found or you are not authorized');
  }

  const { title } = req.body;
  if (!title?.trim()) {
    throw new ApiError(400, 'Section title is required');
  }

  const orderIndex = course.itemSection.length;
  const newItemSection = await ItemSection.create({
    title: title.trim(),
    totalLectures: 0,
    orderIndex,
  });

  course.itemSection.push(newItemSection._id);
  await course.save();

  return res
    .status(201)
    .json(new ApiResponse(201, 'Item section created successfully', newItemSection));
});

export const updateItemSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const instructor = await User.findById(userId);
  if (!instructor) {
    throw new ApiError(404, 'Instructor not found');
  }

  if (instructor.role !== 'instructor') {
    throw new ApiError(401, 'Access Denied || Instructor Only');
  }

  const { itemSectionId } = req.params;
  const itemSection = await ItemSection.findById(itemSectionId);

  if (!itemSection) {
    throw new ApiError(404, 'Invalid item section id');
  }

  const course = await Course.findOne({
    itemSection: itemSectionId,
    instructor: userId,
  });

  if (!course) {
    throw new ApiError(403, 'You are not authorized to update this item section');
  }

  const { title } = req.body;
  itemSection.title = title;
  await itemSection.save();

  return res
    .status(200)
    .json(new ApiResponse(200, 'Item section updated successfully', itemSection));
});

export const deleteItemSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const instructor = await User.findById(userId);
  if (!instructor) {
    throw new ApiError(404, 'Instructor not found');
  }

  if (instructor.role !== 'instructor') {
    throw new ApiError(401, 'Access Denied || Instructor Only');
  }

  const { courseId } = req.params;
  const itemSection = await ItemSection.findById(courseId);

  if (!itemSection) {
    throw new ApiError(404, 'Invalid item section id');
  }

  const course = await Course.findOne({
    itemSection: itemSection._id,
    instructor: userId,
  });

  if (!course) {
    throw new ApiError(403, 'You are not authorized to delete this item section');
  }

  await ItemSection.findByIdAndDelete(courseId);
  course.itemSection = course.itemSection.filter((item) => item.toString() !== courseId);
  await course.save();

  res.status(200).json(new ApiResponse(200, 'Item section deleted successfully', {}));
});

export const getItemSectionById = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const instructor = await User.findById(userId);
  if (!instructor) {
    throw new ApiError(404, 'Instructor not found');
  }

  if (instructor.role !== 'instructor') {
    throw new ApiError(401, 'Access Denied || Instructor Only');
  }

  const { itemSectionId } = req.params;
  const itemSection = await ItemSection.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(itemSectionId),
      },
    },
    {
      $lookup: {
        from: 'subitemsections',
        localField: 'subItemSection',
        foreignField: '_id',
        as: 'subItemSectionDetails',
      },
    },
  ]);

  if (!itemSection || itemSection.length === 0) {
    throw new ApiError(404, 'Invalid item section id');
  }

  const course = await Course.findOne({
    itemSection: itemSectionId,
    instructor: userId,
  });

  if (!course) {
    throw new ApiError(403, 'You are not authorized to fetch this item section');
  }

  res.status(200).json(new ApiResponse(200, 'Item section fetched successfully', itemSection[0]));
});

export const getAllItemSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.params;

  // Validate courseId
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid course ID');
  }

  // Validate user and instructor role
  const instructor = await User.findById(userId);
  if (!instructor || instructor.role !== 'instructor') {
    throw new ApiError(403, 'Access Denied | Instructor Only');
  }

  // Find course with populated sections and sub-items
  const course = await Course.findOne({
    _id: courseId,
    instructor: userId,
  }).populate({
    path: 'itemSection',
    select: 'title orderIndex subItemSection totalLectures',
    populate: {
      path: 'subItemSection',
      select: 'title itemType duration contentUrl content',
      options: { sort: { orderIndex: 1 } },
    },
    options: { sort: { orderIndex: 1 } },
  });

  if (!course) {
    throw new ApiError(404, 'Course not found or you are not authorized');
  }

  // Transform response data
  const formattedCourse = {
    _id: course._id,
    title: course.title,
    sections: course.itemSection.map((section) => ({
      _id: section._id,
      title: section.title,
      orderIndex: section.orderIndex,
      totalLectures: section.totalLectures,
      subItems: section.subItemSection || [],
    })),
  };

  return res
    .status(200)
    .json(new ApiResponse(200, 'Course sections fetched successfully', formattedCourse));
});
