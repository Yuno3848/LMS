import mongoose, { Schema } from 'mongoose';

const couponSchema = new Schema(
  {
    couponCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
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
    appliesTo: {
      type: String,
      enum: ['all', 'specific'],
      default: 'all',
    },
    courses: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  },
  { timestamps: true },
);

export const Coupon = mongoose.model('Coupon', couponSchema);
