import mongoose from "mongoose";
import { questionsSchema } from "./questions.schema.js";

export const itemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["video", "text", "quiz", "assignment"],
    required: true,
  },
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
  orderIndex: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number,
    min: 0,
    default: 0,
  },
  quiz: {
    passingScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    timeLimit: {
      type: Number,
      min: 0,
      max: 180,
    },
    questions: [questionsSchema],
  },
});
