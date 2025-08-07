import mongoose, { Schema } from 'mongoose';

const transactionSchema = new Schema(
  {
    receipt: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      enum: ['USD', 'INR'],
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'FAILED'],
      default: 'PENDING',
    },
    razorpayId: {
      type: String,
      required: true,
      index: true,
    },
    payerID: {
      type: String,
    },
    paymentGateway: {
      type: String,
      default: 'paypal',
    },

    email: {
      type: String,
    },
    contact: {
      type: String,
    },

    transactionDate: {
      type: Date,
      default: Date.now,
    },
    rawResponse: {
      type: Object,
    },
  },
  { timestamps: true },
);

export const Transaction = mongoose.model('Transaction', transactionSchema);
