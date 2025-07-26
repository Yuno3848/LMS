import mongoose, { Schema } from 'mongoose';

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },

    maxUses: {
      type: Number,
      default: null,
      min: 1,
    },

    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Coupon = mongoose.model('Coupon', couponSchema);
