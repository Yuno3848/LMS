import User from '../models/auth.models.js';
import { Course } from '../models/course.model.js';
import { ItemSection } from '../models/itemSection.model.js';
import { subItemSection } from '../models/subItemSection.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';

const validateInstructor = async (userId) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId);
  if (!user || user.role.toLowerCase() !== 'instructor') {
    throw new ApiError(403, 'Access denied | Instructor only!');
  }
  return user;
};

const validateCourseOwnership = async (itemSectionId, userId) => {
  const itemSection = await ItemSection.findById(itemSectionId);
  if (!itemSection) {
    throw new ApiError(404, 'Item section not found');
  }

  const course = await Course.findOne({
    itemSection: itemSectionId,
    instructor: userId,
  });

  if (!course) {
    throw new ApiError(403, 'You are not authorized to modify this section');
  }

  return { itemSection, course };
};

export const createSubItemSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  await validateInstructor(userId);

  const { itemSectionId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(itemSectionId)) {
    throw new ApiError(400, 'Invalid item section ID');
  }

  const { itemSection } = await validateCourseOwnership(itemSectionId, userId);

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

  // Validate required fields
  if (!itemType || !title) {
    throw new ApiError(400, 'Item type and title are required');
  }

  let contentUrl = req.body.contentUrl;
  if (req.file && itemType === 'video') {
    contentUrl = req.file.cloudStoragePublicUrl;
  }

  if (itemType === 'video' && !contentUrl) {
    throw new ApiError(400, 'Content URL is required for video items');
  }

  const questions =
    question && options
      ? [
          {
            question,
            options: Array.isArray(options) ? options : options.split(',').map((opt) => opt.trim()),
            correctAnswer,
            explanation,
          },
        ]
      : [];

  const subItem = await subItemSection.create({
    itemType,
    title,
    content,
    duration,
    contentUrl,
    orderIndex: orderIndex ?? itemSection.subItemSection.length,
    questions,
    maxScore,
  });

  itemSection.subItemSection.push(subItem._id);
  itemSection.totalLectures = itemSection.subItemSection.length;
  await itemSection.save();

  return res.status(201).json(new ApiResponse(201, 'SubItemSection created successfully', subItem));
});

export const deleteSubItemSection = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  await validateInstructor(userId);

  const { subItemId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(subItemId)) {
    throw new ApiError(400, 'Invalid subItem ID');
  }

  const itemSection = await ItemSection.findOne({ subItemSection: subItemId });
  if (!itemSection) {
    throw new ApiError(404, 'Item section not found');
  }

  await validateCourseOwnership(itemSection._id.toString(), userId);

  const [deletedSubItem, updatedItemSection] = await Promise.all([
    subItemSection.findByIdAndDelete(subItemId),
    ItemSection.findByIdAndUpdate(
      itemSection._id,
      {
        $pull: { subItemSection: subItemId },
        $inc: { totalLectures: -1 },
      },
      { new: true },
    ),
  ]);

  if (!deletedSubItem || !updatedItemSection) {
    throw new ApiError(400, 'Failed to delete sub item section');
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
  await validateInstructor(userId);

  const { subItemId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(subItemId)) {
    throw new ApiError(400, 'Invalid subItem ID');
  }

  const subItem = await subItemSection.findById(subItemId);
  if (!subItem) {
    throw new ApiError(404, 'Sub item not found');
  }

  const itemSection = await ItemSection.findOne({ subItemSection: subItemId });
  if (!itemSection) {
    throw new ApiError(404, 'Item section not found');
  }

  await validateCourseOwnership(itemSection._id.toString(), userId);

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

  if (itemType === 'video' && !contentUrl && !subItem.contentUrl) {
    throw new ApiError(400, 'Content URL is required for video items');
  }

  const questions =
    question && options
      ? [
          {
            question,
            options: Array.isArray(options) ? options : options.split(',').map((opt) => opt.trim()),
            correctAnswer,
            explanation,
          },
        ]
      : subItem.questions;

  const updateData = {
    ...(itemType && { itemType }),
    ...(title && { title }),
    ...(content !== undefined && { content }),
    ...(duration !== undefined && { duration }),
    ...(contentUrl && { contentUrl }),
    ...(orderIndex !== undefined && { orderIndex }),
    ...(questions && { questions }),
    ...(maxScore !== undefined && { maxScore }),
  };

  const updatedSubItem = await subItemSection.findByIdAndUpdate(subItemId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedSubItem) {
    throw new ApiError(500, 'Failed to update sub item section');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Sub item section updated successfully', updatedSubItem));
});

export const getSubItemSectionById = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  await validateInstructor(userId);

  const { subItemId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(subItemId)) {
    throw new ApiError(400, 'Invalid subItem ID');
  }

  const subItem = await subItemSection.findById(subItemId);
  if (!subItem) {
    throw new ApiError(404, 'Sub item not found');
  }

  const itemSection = await ItemSection.findOne({ subItemSection: subItemId });
  if (!itemSection) {
    throw new ApiError(404, 'Item section not found');
  }

  await validateCourseOwnership(itemSection._id.toString(), userId);

  return res
    .status(200)
    .json(new ApiResponse(200, 'Sub item section fetched successfully', subItem));
});

export const getAllSubItemSections = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  await validateInstructor(userId);
  console.log('user id :', userId);
  const { courseId } = req.params;
  console.log('course id :', courseId);
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    throw new ApiError(400, 'Invalid item section ID');
  }

  const { itemSection } = await validateCourseOwnership(courseId, userId);

  const populatedItemSection = await ItemSection.findById(courseId)
    .populate({
      path: 'subItemSection',
      select: 'itemType title content duration contentUrl orderIndex maxScore',
    })
    .select('title subItemSection totalLectures');

  return res
    .status(200)
    .json(new ApiResponse(200, 'All sub item sections fetched successfully', populatedItemSection));
});
