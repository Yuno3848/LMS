import mongoose, { Schema } from 'mongoose';

export const questionsSchema = new Schema({
  questionText: {
    type: String,
    trim: true,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['multiple_choice', 'true_false', 'short_answer'],
    required: true,
  },
  options: [
    {
      type: String,
      trim: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
    trim: true,
  },
  points: {
    type: Number,
    min: 0,
    default: 1,
  },
  orderIndex: {
    type: Number,
    required: true,
  },
});
