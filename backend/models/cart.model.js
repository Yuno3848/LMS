import mongoose, { Schema } from 'mongoose';

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],

    coupon: {
      type: Schema.Types.ObjectId,
      ref: 'Coupon',
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    isCheckedOut: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Cart = mongoose.model('Cart', cartSchema);
