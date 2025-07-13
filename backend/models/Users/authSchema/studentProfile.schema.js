import mongoose, { Schema } from "mongoose";
import { enrollmentHistorySchema } from "./enrollmentHistory.schema.js";

export const studentProfileSchema = new Schema(
  {
    isVerifiedStudent: {
      type: Boolean,
      default: false,
    },
    enrolledCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    enrolledHistory: [enrollmentHistorySchema],
  },
  { timestamps: true }
);
