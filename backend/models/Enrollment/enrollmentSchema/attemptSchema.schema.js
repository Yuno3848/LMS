import mongoose, { Schema } from "mongoose";

export const attemptSchema = new Schema({
  score: {
    type: Number,
    required: true,
    min: 0,
  },
  maxScore: {
    type: Number,
    required: true,
    min: 0,
  },
  passed: {
    type: Boolean,
    default: false,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  answers: [answerSchema],
});
