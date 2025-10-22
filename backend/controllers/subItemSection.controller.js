import User from '../models/auth.models.js';
import { Course } from '../models/course.model.js';
import { ItemSection } from '../models/itemSection.model.js';
import { subItemSection } from '../models/subItemSection.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

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

  const { itemType, title, orderIndex, content } = req.body;

  let contentData = {
    url: '',
    localPath: '',
  };

  // Handle assignment file upload (PDF)
  if (itemType === 'assignment') {
    if (!req.file) {
      throw new ApiError(400, 'PDF file is required for assignment items');
    }

    try {
      const pdfDataResult = await uploadOnCloudinary(req.file.buffer,req.file.originalname);
      contentData = {
        url: pdfDataResult.secure_url,
        localPath: pdfDataResult.public_id,
      };
    } catch (error) {
      throw new ApiError(500, `Failed to upload assignment: ${error.message}`);
    }
  } else if (itemType === 'video') {
    // Handle video URL
    const lectureVideo = await uploadOnCloudinary(req.file.buffer,req.file.originalname)
   
    contentData = {
      url: lectureVideo.secure_url,
      localPath: lectureVideo.public_id,
    };
  }

  const subItem = await subItemSection.create({
    itemType,
    title,
    content,
    contentUrl: contentData,
    orderIndex: orderIndex ?? itemSection.subItemSection?.length ?? 0,
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

  // Find parent item section that contains this subItem
  const itemSection = await ItemSection.findOne({ subItemSection: subItemId });
  if (!itemSection) {
    throw new ApiError(404, 'Item section not found');
  }

  await validateCourseOwnership(itemSection._id.toString(), userId);

  // Find subitem
  const subItem = await subItemSection.findById(subItemId);
  if (!subItem) {
    throw new ApiError(404, 'Sub item not found');
  }

  // Optional: Delete file from Cloudinary if contentUrl exists
  // NOTE: You need to store `public_id` to safely delete the file from Cloudinary.
  // if (subItem.contentUrl) {
  //   const publicId = extractPublicId(subItem.contentUrl);
  //   await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
  // }

  // Remove subItem and update parent section
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
