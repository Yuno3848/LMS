import razorpay from '../config/razorpay.config.js';
import { Transaction } from '../models/transaction.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { Course } from '../models/course.model.js';
import { Coupon } from '../models/coupon.model.js';
import { Enrollment } from '../models/enrollment.model.js';
import dotenv from 'dotenv';
dotenv.config();
export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const { subTotal: amount } = req.body;
  const { courseIds } = req.body;

  if (!amount) {
    throw new ApiError(500, 'course not available!');
  }

  const enrolledCourse = await Enrollment.exists({
    studentId: userId,
    courseIds: { $in: courseIds },
  });

  if (enrolledCourse) {
    throw new ApiError(400, 'User already enrolled in one or more courses');
  }

  let finalAmount = Number(amount);

  //create options for the razorpay. To create order
  const options = {
    amount: Math.round(finalAmount * 100), //paise
    currency: 'INR',
    receipt: `rcpt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  const transaction = await Transaction.create({
    receipt: order.receipt,
    userId,
    courseId: courseIds.map((courseId) => new mongoose.Types.ObjectId(courseId)),
    amount: order.amount,
    currency: order.currency,
    status: 'PENDING',
    razorpayId: order.id,
    paymentGateway: 'razorpay',
    rawResponse: order,
  });

  if (!transaction) throw new ApiError(400, 'failed to create transaction');

  return res.status(201).json(new ApiResponse(201, 'created order successfully', transaction));
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    transactionId,
    couponCode,
    courseIds,
  } = req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest('hex');

  const isValid = expectedSignature === razorpay_signature;

  if (!isValid) {
    throw new ApiError(400, 'Invalid Razorpay signature');
  }

  const transaction = await Transaction.findByIdAndUpdate(
    transactionId,
    {
      status: 'COMPLETED',
      payerID: razorpay_payment_id,
      email: req.body.email,
      contact: req.body.contact,
    },
    { new: true },
  );

  if (!transaction) {
    throw new ApiError(404, 'transaction verification failed.');
  }

  if (couponCode) {
    await Coupon.findOneAndUpdate(
      { couponCode: couponCode.toUpperCase() },
      {
        $inc: { usedCount: 1 },
      },
    );
  }

  const enrollment = await Enrollment.create({
    studentId: userId,
    courseIds: courseIds.map((courseId) => new mongoose.Types.ObjectId(courseId)),
    transactionId,
    isPaid: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, 'Payment verified successfully', { transaction, enrollment }));
});

export const getTransactionById = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { transactionId } = req.params;

  const transaction = await Transaction.findOne({
    _id: transactionId,
    userId,
  })('Course');

  if (!transaction) {
    throw new ApiError(404, 'transaction not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Transaction fetched successfully', transaction));
});

export const getAllTransaction = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const transaction = await Transaction.find().populate('Course');

  if (!transaction) {
    throw new ApiError(404, 'transaction not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Transaction fetched successfully', transaction));
});
