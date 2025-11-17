import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/auth.models.js';

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

export const createCoupon = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await validateInstructor(userId);
});
export const deleteCoupon = asyncHandler(async (req, res) => {});
export const extendCouponExpiry = asyncHandler(async (req, res) => {});
export const showAllCoupon = asyncHandler(async (req, res) => {});
export const showCoupon = asyncHandler(async (req, res) => {});
