import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import User from '../models/auth.models.js';
import { Course } from '../models/course.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import { instructorProfile } from '../models/instructorProfile.model.js';
import { Coupon } from '../models/coupon.model.js';
import { calculateDiscountPrice } from '../utils/calculateCouponDiscount.js';

export const createCourse = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not Authorized');
  }

  const user = await User.findById(userId).populate('instructorProfile');
  if (!user || user.role.toLowerCase() !== 'instructor') {
    throw new ApiError(403, 'Access denied | Instructor only!');
  }

  if (!user.instructorProfile) {
    throw new ApiError(400, 'Instructor profile not found');
  }
  const { title, description, base, currency, courseExpiry, difficulty, tags, category } = req.body;

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
      base: base,
      final: base,
      currency: currency,
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
    .json(new ApiResponse(201, 'course created and added to the instructor profile', newCourse));
});

export const getAllCourses = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId).populate('instructorProfile');
  if (!user || user.role.toLowerCase() !== 'instructor') {
    throw new ApiError(403, 'Access denied | Instructor only!');
  }
  if (!user.instructorProfile) {
    throw new ApiError(400, 'Instructor Profile not found');
  }

  const course = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: 'instructorprofiles',
        localField: 'instructorProfile',
        foreignField: '_id',
        as: 'instructorProfile',
      },
    },
    {
      $unwind: '$instructorProfile',
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'instructorProfile.courses',
        foreignField: '_id',
        as: 'courses',
      },
    },
    {
      $project: {
        _id: 0,
        username: 1,
        courses: '$courses.title',
      },
    },
  ]);

  return res.status(200).json(new ApiResponse(200, 'fetched all courses', course));
});

export const getCourseById = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.params;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }
  const user = await User.findById(userId);
  if (!user || user.role.toLowerCase() !== 'instructor') {
    throw new ApiError(403, 'Access denied | Instructor only!');
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const instructor = await User.findOne({
    role: 'instructor',
  });

  if (!instructor) {
    throw new ApiError(404, 'instructor not found');
  }

  return res.status(200).json(new ApiResponse(200, 'Course fetched successfully', course));
});

export const isPublish = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const { courseId } = req.params;

  if (!courseId) {
    throw new ApiError(404, 'Invalid course id');
  }
  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const user = await User.findById(userId).select('role instructorProfile');
  if (!user || user.role.toLowerCase() !== 'instructor') {
    throw new ApiError(403, 'Access Denied | Instructor Only');
  }

  if (!user.instructorProfile) {
    throw new ApiError(400, 'Instructor profile not found');
  }

  await user.populate({
    path: 'instructorProfile',
    populate: {
      path: 'courses',
      model: 'Course',
    },
  });

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const ownsCourse = user.instructorProfile.courses.some((id) => id._id.toString() === courseId);

  if (!ownsCourse) {
    throw new ApiError(403, 'You do not have permission to publish this course');
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    {
      isPublished: true,
    },
    { new: true },
  ).select('-_id -courseSection -tags -price -thumbnail');
  // fetch username

  if (!updatedCourse) {
    throw new ApiError(404, 'Course not found');
  }

  return res.status(200).json(new ApiResponse(200, 'course published successfully', updatedCourse));
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.params;

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

  //delete course from course model
  const course = await Course.findByIdAndDelete(courseId);
  if (!course) {
    throw new ApiError(400, 'course not found', course);
  }

  //delete course id from the instructor Profile
  user.instructorProfile.courses = user.instructorProfile.courses.filter(
    (id) => id.toString() !== courseId,
  );
  await user.instructorProfile.save();
  return res.status(200).json(new ApiResponse(200, 'deleted successfully'));
});

//coupon discount ->course

export const applyCouponToCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { couponCode } = req.body;

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found.');
  }

  const coupon = await Coupon.findOne({ couponCode });

  if (!coupon || !coupon.isActive) {
    throw new ApiError(404, 'Invalid or Inactive coupon.');
  }

  if (coupon.maxUses <= coupon.usedCount || coupon.maxUses === null) {
    throw new ApiError(400, 'Coupon usage limited reached ! ');
  }

  const finalPrice = calculateDiscountPrice(price.base, coupon);

  return res.status(200).json(
    new ApiResponse(200, 'Coupon applied successfully', {
      courseId: course._id,
      title: course.title,
      basePrice: course.price.base,
      finalPrice,
      currency: course.price.currency,
      couponApplied: coupon.code,
    }),
  );
});
