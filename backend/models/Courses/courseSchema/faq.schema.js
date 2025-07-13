import mongoose, { Schema } from "mongoose";

export const faqSchema = new Schema({
  questions: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  orderIndex: {
    type: Number,
    required: true,
  },
});
