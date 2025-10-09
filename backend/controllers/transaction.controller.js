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

export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const { couponCode } = req.body;
  const { courseId } = req.params;
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId.toString())) {
    throw new ApiError(404, 'Invalid course id!!!');
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found!!!');
  }
  let finalAmount = course.price.final;

  if (couponCode) {
    const coupon = await Coupon.findOne({ couponCode: couponCode.toUpperCase(), isActive: true });
    if (!coupon) {
      throw new ApiError(404, 'Coupon Code not found!!!');
    }

    if (coupon.maxUses && coupon.maxUses <= coupon.usedCount) {
      throw new ApiError(400, 'Coupon limit reached!!!');
    }

    if (coupon.courses?.length > 0 && !coupon.courses.some((id) => id.equals(courseId))) {
      throw new ApiError(400, 'Coupon not valid for this course');
    }

    if (coupon.discountType === 'percentage') {
      finalAmount = finalAmount - (finalAmount * coupon.discountValue) / 100;
    } else if (coupon.discountType === 'fixed') {
      finalAmount = finalAmount - coupon.discountValue;
    }
    finalAmount = Math.max(finalAmount, 0);
  }

  const options = {
    amount: Math.floor(finalAmount * 100),
    currency: 'INR',
    receipt: `rcpt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  const transaction = await Transaction.create({
    receipt: order.receipt,
    userId,
    courseId,
    amount: options.amount,
    currency: options.currency,
    status: 'PENDING',
    razorpayId: order.id,
    paymentGateway: 'razorpay',
    rawResponse: order,
  });

  if (!transaction) {
    throw new ApiError(400, 'failed to create transaction');
  }


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
    courseId,
  } = req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
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
    throw new ApiError(404, 'transaction verificatino failed.');
  }

  if (couponCode) {
    await Coupon.findOneAndUpdate(
      { couponCode: couponCode.toUpperCase() },
      {
        $inc: { usedCount: 1 },
      },
    );
  }

  const existingEnrollment = await Enrollment.findOne({ studentId: userId, courseId });

  if (existingEnrollment) {
    throw new ApiError(400, 'You already enrolled in the course');
  }

  const enrollment = await Enrollment.create({
    studentId: userId,
    courseId,
    transactionId,
    enrolledAt: Date.now(),
    isPaid: true,
    paymentDate: transaction.createdAt,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, 'Payment verified successfully', { transaction, enrollment }));
});

export const cancelTransaction = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { transactionId } = req.params;

  const transaction = await Transaction.findByIdAndUpdate(
    { _id: transactionId, userId },
    {
      status: 'FAILED',
    },
    {
      new: true,
    },
  );

  if (!transaction) {
    throw new ApiError(404, 'Transaction not found');
  }

  return res.status(200).json(200, 'Transaction cancelled successfully', Transaction);
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
