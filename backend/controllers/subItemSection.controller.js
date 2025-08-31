import User from '../models/auth.models.js';
import { Course } from '../models/course.model.js';
import { courseSection } from '../models/courseSection.model.js';
import { ItemSection } from '../models/itemSection.model.js';
import { subItemSection } from '../models/subItemSection.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';

export const createSubItemSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId);
  if (!user || user.role.toLowerCase() !== 'instructor') {
    throw new ApiError(403, 'Access denied | Instructor only!');
  }

  const { itemSectionId } = req.params;
  if (!itemSectionId || !mongoose.Types.ObjectId.isValid(itemSectionId.toString())) {
    throw new ApiError(400, 'Invalid item section id');
  }
  const itemSection = await ItemSection.findById(itemSectionId);

  if (!itemSection) {
    throw new ApiError(404, 'item section not found');
  }

  const isCourseSection = await courseSection.findOne({ itemSection: itemSectionId });

  if (!isCourseSection) {
    throw new ApiError(404, 'Course section not found');
  }

  const course = await Course.findOne({ courseSection: isCourseSection._id });
  if (!course) {
    throw new ApiError(404, 'course not found');
  }
  if (course.instructor.toString() !== userId.toString()) {
    throw new ApiError(403, 'You are not authorized to modify this sub item section');
  }

  const {
    itemType,
    title,
    content,
    duration,

    orderIndex,
    question,
    options,
    correctAnswer,
    explanation,
    maxScore,
  } = req.body;

  let contentUrl = req.body.contentUrl;
  if (req.file && itemType === 'video') {
    contentUrl = req.file.cloudStoragePublicUrl;
  }

  if (itemType === 'video' && !contentUrl) {
    throw new ApiError(400, 'content url is required for the video item');
  }

  let questions = [];
  if (question && options && correctAnswer && explanation) {
    questions.push({
      question,
      options: options.split(','),
      correctAnswer,
      explanation,
    });
  }
  const newSubItem = await subItemSection.create({
    itemType,
    title,
    content,
    duration,
    contentUrl,
    orderIndex,
    questions,
    maxScore,
  });

  itemSection.subItemSection.push(newSubItem._id);
  await itemSection.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newSubItem, 'SubItemSection created successfully'));
});

export const deleteSubItemSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId);
  if (!user || user.role.toLowerCase() !== 'instructor') {
    throw new ApiError(403, 'Access denied | Instructor only!');
  }

  const { subItemId } = req.params;

  if (!subItemId || !mongoose.Types.ObjectId.isValid(subItemId.toString())) {
    throw new ApiError(404, 'Invalid subItem Id');
  }

  const itemSection = await ItemSection.findOne({ subItemSection: subItemId });

  if (!itemSection) {
    throw new ApiError(404, 'item section not found');
  }
  const isCourseSection = await courseSection.findOne({ itemSection: itemSection._id });

  if (!isCourseSection) {
    throw new ApiError(404, 'Course section not found');
  }

  const course = await Course.findOne({ courseSection: isCourseSection._id });
  if (!course) {
    throw new ApiError(404, 'course not found');
  }
  if (course.instructor.toString() !== userId.toString()) {
    throw new ApiError(403, 'You are not authorized to modify this sub item section');
  }

  const deletedSubItem = await subItemSection.findByIdAndDelete(subItemId);
  if (!deletedSubItem) {
    throw new ApiError(400, 'sub item not found');
  }

  const updatedItemSection = await ItemSection.findByIdAndUpdate(
    itemSection._id,
    {
      $pull: {
        subItemSection: subItemId,
      },
    },
    { new: true },
  );

  if (!updatedItemSection) {
    throw new ApiError(400, ' item section not found');
  }

  return res.status(200).json(
    new ApiResponse(200, 'Sub item section deleted successfully', {
      deletedSubItem: {
        _id: deletedSubItem._id,
        title: deletedSubItem.title,
        itemType: deletedSubItem.itemType,
      },
      remainingSubItems: updatedItemSection.subItemSection.length,
    }),
  );
});

export const updateSubItemSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId);
  if (!user || user.role.toLowerCase() !== 'instructor') {
    throw new ApiError(403, 'Access denied | Instructor only!');
  }

  const { subItemId } = req.params;
  if (!subItemId || !mongoose.Types.ObjectId.isValid(subItemId)) {
    throw new ApiError(400, 'Invalid subItem Id');
  }

  let subItem = await subItemSection.findById(subItemId);
  if (!subItem) {
    throw new ApiError(404, 'Sub item not found');
  }

  const isItemSection = await ItemSection.findOne({ subItemSection: subItemId });
  if (!isItemSection) {
    throw new ApiError(404, 'item section not found');
  }

  const iscourseSection = await courseSection.findOne({ itemSection: isItemSection._id });

  if (!iscourseSection) {
    throw new ApiError(404, 'Course section not found');
  }

  const course = await Course.findOne({ courseSection: iscourseSection._id });
  if (!course) {
    throw new ApiError(404, 'course not found');
  }
  if (course.instructor.toString() !== userId.toString()) {
    throw new ApiError(403, 'You are not authorized to modify this sub item section');
  }
  const {
    itemType,
    title,
    content,
    duration,
    orderIndex,
    question,
    options,
    correctAnswer,
    explanation,
    maxScore,
  } = req.body;

  let contentUrl = req.body.contentUrl;
  if (req.file && itemType === 'video') {
    contentUrl = req.file.cloudStoragePublicUrl;
  }

  if (itemType === 'video' && !contentUrl) {
    throw new ApiError(400, 'Content URL is required for video items');
  }

  let questions = [];
  if (question && options && correctAnswer && explanation) {
    questions.push({
      question,
      options: Array.isArray(options) ? options : options.split(',').map((opt) => opt.trim()),
      correctAnswer,
      explanation,
    });
  }

  const updatedSubItem = await subItemSection.findByIdAndUpdate(
    subItemId,
    {
      itemType,
      title,
      content,
      duration,
      contentUrl,
      orderIndex,
      questions,
      maxScore,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedSubItem) {
    throw new ApiError(500, 'Failed to update sub item section');
  }

  return res.status(200).json(
    new ApiResponse(200, 'Sub item section updated successfully', {
      _id: updatedSubItem._id,
      itemType: updatedSubItem.itemType,
      title: updatedSubItem.title,
      content: updatedSubItem.content,
      duration: updatedSubItem.duration,
      contentUrl: updatedSubItem.contentUrl,
      orderIndex: updatedSubItem.orderIndex,
      questions: updatedSubItem.questions,
      maxScore: updatedSubItem.maxScore,
    }),
  );
});
