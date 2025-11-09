import mongoose from 'mongoose';
import { Cart } from '../models/cart.model.js';
import { Course } from '../models/course.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  const { courseId } = req.params;
  console.log('course id :', courseId);
  const isCourseExist = await Course.findById(courseId);
  if (!isCourseExist) {
    throw new ApiError(404, 'Invalid course id');
  }

  let cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      courses: [courseId],
    });
  } else {
    const isAlreadyExist = cart.courses.some((id) => id.toString() == courseId);
    if (isAlreadyExist) {
      throw new ApiError(400, 'Course already in cart!');
    }

    cart.courses.push(courseId);
    await cart.save();
  }

  await cart.populate({
    path: 'courses',
    select: '-thumbnail._id -isPublished -price._id -totalAmount -isCheckedOut -tags -itemSection',
  });

  return res.status(201).json(new ApiResponse(201, 'course added to cart successfully!', cart));
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.body;
  console.log("cart course id :", courseId)
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(401, 'user not authorized!');
  }

  const isCourseExist = await Course.findById(courseId);

  if (!isCourseExist) {
    throw new ApiError(404, 'Invalid course id!');
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new ApiError(404, 'Cart not exist!');
  }

  const isInCart = cart.courses.some((id) => id.toString() === courseId);

  if (!isInCart) {
    throw new ApiError(400, 'Course not found in cart!');
  }

  cart.courses = cart.courses.filter((id) => id.toString() != courseId);

  await cart.save();

  if (cart.courses.length === 0) {
    await Cart.findByIdAndDelete(cart._id);
  }

  return res.status(200).json(new ApiResponse(201, 'course removed from cart successfully!'));
});

export const showCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(401, 'Unauthorized User');
  }

  const cart = await Cart.findOne({
    user: userId,
  }).populate({
    path: 'courses',
    select: '-thumbnail._id -isPublished -price._id -totalAmount -isCheckedOut -tags -itemSection',
  });

  if (!cart) {
    throw new ApiError(404, 'Cart not found!');
  }

  return res.status(200).json(new ApiResponse(200, 'Cart shown successfully!', cart));
});
