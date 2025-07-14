import mongoose, { Schema } from 'mongoose';

export const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
