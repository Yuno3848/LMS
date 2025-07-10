import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema({
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
  orderIndex: {
    type: Number,
    required: true,
  },
});
const Section = mongoose.model("Section", sectionSchema);
export default Section;
