import ApiError from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import mongoose from 'mongoose';
import User from '../models/auth.models.js';
import { Enrollment } from '../models/enrollment.model.js';

export const createEnrollment = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { courseId, transactionId } = req.body;

   

});

export const enrollInCourse = asyncHandler(async (req, res) => {});
export const getUserEnrollments = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const enrollment = await Enrollment.findOne({ studentId: userId }).populate('User');

  if (!enrollment) {
    throw new ApiError(404, 'Enrollment history not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Enrollment history found successfully', enrollment));
});
export const getItemSectionProgress = asyncHandler(async (req, res) => {});
export const getSubItemSectionProgress = asyncHandler(async (req, res) => {});
export const checkEnrollment = asyncHandler(async (req, res) => {});
export const markEnrollmentPaid = asyncHandler(async (req, res) => {});
