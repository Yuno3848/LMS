import mongoose, { Schema } from "mongoose";

const instructorProfileSchema = new Schema({
  bio: {
    type: String,
    trim: true,
  },
  expertise: [
    {
      type: String,
      require: true,
      trim: true,
    },
  ],
  rating: {
    type: Number,
  },
  totalCourses: {
    type: Number,
  },
  isVerifiedInstructor: { type: Boolean },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
const instructorProfile = mongoose.model(
  "instructorProfile",
  instructorProfileSchema
);
export default instructorProfile;
