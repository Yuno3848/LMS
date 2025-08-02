import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { courseSection } from '../models/courseSection.model.js';
import { ItemSection } from '../models/itemSection.model.js';
import { Course } from '../models/course.model.js';
import User from '../models/auth.models.js';

export const createItemSection = asyncHandler(async (req, res) => {
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

  const { courseSectionId } = req.params;
  const course = await Course.findOne({
    courseSection: courseSectionId,
    instructor: userId,
  });
  if (!course) {
    throw new ApiError(403, 'You are not authorized to modify this course section');
  }

  const section = await courseSection.findById(courseSectionId);
  if (!section) {
    throw new ApiError(404, 'Course section not found.');
  }

  const { title } = req.body;

  const orderIndex = section.itemSection.length;

  const newSubItemSection = await ItemSection.create({
    title,
    totalLectures: 0,
    orderIndex,
  });

  section.itemSection.push(newSubItemSection._id);
  await section.save();

  return res
    .status(201)
    .json(new ApiResponse(201, 'Item section created successfully', newSubItemSection));
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

  const section = await courseSection.findOne({
    itemSection: itemSectionId,
  });

  if (!section) {
    throw new ApiError(404, 'item section not found');
  }

  const course = await Course.findOne({
    courseSection: section._id,
    instructor: userId,
  });

  if (!course) {
    throw new ApiError(403, 'you are not authorized to update this item section');
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

  const { itemSectionId } = req.params;
  const itemSection = await ItemSection.findById(itemSectionId);

  if (!itemSection) {
    throw new ApiError(404, 'Invalid item section id');
  }

  const section = await courseSection.findOne({
    itemSection: itemSectionId,
  });

  if (!section) {
    throw new ApiError(404, 'item section not found');
  }

  const course = await Course.findOne({
    courseSection: section._id,
    instructor: userId,
  });

  if (!course) {
    throw new ApiError(403, 'you are not authorized to delete this item section');
  }

  await ItemSection.findByIdAndDelete(itemSectionId);
  section.itemSection = section.itemSection.filter((item) => item._id.toString() !== itemSectionId);
  await section.save();
  res.status(200).json(new ApiResponse(200, {}, 'Item section deleted successfully'));
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
        from: 'subitemsections', // collection name
        localField: 'subItemSection',
        foreignField: '_id',
        as: 'subItemSectionDetails',
      },
    },
  ]);

  if (!itemSection) {
    throw new ApiError(404, 'Invalid item section id');
  }

  const section = await courseSection.findOne({
    itemSection: itemSectionId,
  });

  if (!section) {
    throw new ApiError(404, 'item section not found');
  }

  const course = await Course.findOne({
    courseSection: section._id,
    instructor: userId,
  });

  if (!course) {
    throw new ApiError(403, 'you are not authorized to fetched this item section');
  }

  res.status(200).json(new ApiResponse(200, 'Item section fetched successfully', itemSection));
});
export const getAllItemSection = asyncHandler(async (req, res) => {
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

  const { courseSectionId } = req.params;

  const course = await Course.findOne({
    courseSection: courseSectionId,
    instructor: userId,
  });

  if (!course) {
    throw new ApiError(
      403,
      'You are not authorized to fetch item sections from this course section',
    );
  }

  const itemSection = await courseSection
    .findById(courseSectionId)
    .populate({
      path: 'itemSection',
      select: 'title orderIndex subItemSection',
    })
    .select('title orderIndex itemSection');

  if (!itemSection) {
    throw new ApiError(404, 'Course section not found');
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        'All item sections for this course section fetched successfully',
        itemSection,
      ),
    );
});
