import mongoose, { Schema } from "mongoose";

export const questionsSchema = new Schema({
  questionText: {
    type: String,
  },
  questionType: {
    type: String,
    enum: ["mulitple_choice", "true_false", "short_answer"],
    required: true,
  },
  options: [string],
  correctAnswer: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  orderIndex: {
    type: Number,
  },
});
