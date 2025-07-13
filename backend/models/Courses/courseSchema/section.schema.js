import mongoose, { Schema } from "mongoose";

export const sectionSchema = new Schema({
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
  items: [itemsSchema],
});
