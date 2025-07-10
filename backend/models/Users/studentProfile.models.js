import mongoose, { Schema } from "mongoose";

const studentProfileSchema = new Schema(
  {
    isVerifiedStudent: {
      type: Boolean,
      default: false,
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    enrolledHistory: [
      {
        courseId: mongoose.Schema.Types.ObjectId,
        ref: "Enrollment",
      },
    ],
  },
  { timestamps: true }
);

const studentProfile = mongoose.model("studentProfile", studentProfileSchema);
export default studentProfile;
