import mongoose, { Schema } from "mongoose";
import { sectionProgressSchema } from "./enrollmentSchema/sectionProgress.schema";

const enrollmentSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    sectionProgress: [sectionProgressSchema],
    totalTimeSpent: {
      type: Number,
      default: 0, // in seconds
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
