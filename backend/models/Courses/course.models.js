import mongoose, { Schema } from "mongoose";
import Section, { sectionSchema } from "./courseSchema/section.schema.js";
import { discussionSchema } from "./courseSchema/discussion.schema.js";
import { faqSchema } from "./courseSchema/faq.schema.js";
import { announcementSchema } from "./courseSchema/announcement.schema.js";
import { statSchema } from "./courseSchema/stat.schema.js";

const courseSchema = new Schema({
  instructorId: {
    type: Schema.Types.ObjectId,
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
  sections: [sectionSchema],
  discussions: [discussionSchema],
  announcements: [announcementSchema],
  faqs: [faqSchema],
  stat: { statSchema },
});
const Course = mongoose.model("Course", courseSchema);
export default Course;
