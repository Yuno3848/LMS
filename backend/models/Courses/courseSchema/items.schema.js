import mongoose from "mongoose";
import { questionsSchema } from "./questions.schema.js";

export const itemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["video", "text", "quiz", "assignment"],
  },
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
  orderIndex: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
  },
  quiz: {
    passingScore: {
      type: Number,
    },
    timeLimit: {
      type: Number,
    },
    questions: [questionsSchema],
  },
});
