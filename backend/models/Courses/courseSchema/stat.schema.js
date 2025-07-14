import mongoose, { Schema } from 'mongoose';

export const statSchema = new Schema({
  totalEnrollments: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  completionRate: {
    type: Number,
    default: 0,
  },
});
