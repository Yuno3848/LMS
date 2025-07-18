import mongoose, { Schema } from 'mongoose';
import { enrollmentHistorySchema } from './enrollmentHistory.schema.js';

export const studentProfileSchema = new Schema(
  {
    isVerifiedStudent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
