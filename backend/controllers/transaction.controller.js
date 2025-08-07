import razorpay from '../config/razorpay.config.js';
import { Transaction } from '../models/transaction.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
import crypto from 'crypto';
export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId.toString())) {
    throw new ApiError(401, 'User not authorized');
  }

  const { amount } = req.body;
  const { courseId } = req.params;
  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId.toString())) {
    throw new ApiError(404, 'Invalid course id');
  }

  const options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: `rcpt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  const transaction = await Transaction.create({
    receipt: order.receipt,
    userId,
    courseId,
    amount,
    currency: 'INR',
    status: 'PENDING',
    razorpayId: order.id,
    paymentGateway: 'razorpay',
    rawResponse: order,
  });

  if (!transaction) {
    throw new ApiError(400, 'failed to create transaction');
  }

  console.log(transaction);

  return res.status(201).json(new ApiResponse(201, 'created order successfully', transaction));
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, transactionId } = req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHash('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  console.log(expectedSignature);
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

  return res.status(200).json(new ApiResponse(200, 'Payment verified successfully', transaction));
});

export const cancelTransaction = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { transactionId } = req.params;

  const transaction = await Transaction.findByIdAndUpdate(
    { _id: transactionId, userId },
    {
      STATUS: 'FAILED',
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

  const transaction = await Transaction.findById({
    _id: transactionId,
    userId,
  });

  if (!transaction) {
    throw new ApiError(404, 'transaction not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Transaction fetched successfully', transaction));
});

export const getAllTransaction = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const transaction = await Transaction.find();

  if (!transaction) {
    throw new ApiError(404, 'transaction not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Transaction fetched successfully', transaction));
});
