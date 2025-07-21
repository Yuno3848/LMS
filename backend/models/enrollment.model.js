import mongoose, { Schema } from 'mongoose';

const enrollmentSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  },

  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    index: true,
  },

  enrolledAt: {
    type: Date,
    default: Date.now,
  },

  completedLectures: {
    type: Schema.Types.ObjectId,
    ref: 'subItemSectionSchema',
  },
  percentCompleted: {
    type: Number,
    default: 0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },

  transactionId: {
    type: Schema.Types.ObjectId,
    ref: 'Transaction',
  },
  paymentDate: {
    type: Schema.Types.ObjectId,
    ref: 'Transaction',
  },
});

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
