import mongoose, { Schema } from "mongoose";
import Section from "./section.models";

const courseSchema = new Schema({
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  courseExpiry: {
    type: Date,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  sections: Section,
});
const Course = mongoose.model("Course", courseSchema);
export default Course;
