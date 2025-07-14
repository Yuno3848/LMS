import mongoose, { Schema } from 'mongoose';

export const enrollmentHistorySchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});
