import mongoose, { Schema } from 'mongoose';

export const notificationSchema = new Schema(
  {
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
    type: {
      type: String,
      enum: ['announcement', 'discussion', 'quiz', 'general'],
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    relatedId: {
      type: Schema.Types.ObjectId,
      refPath: 'type', // This allows the relatedId to reference different models based on the type
      required: true,
    },
  },
  { timestamps: true },
);
export const Notification = mongoose.model('Notification', notificationSchema);
