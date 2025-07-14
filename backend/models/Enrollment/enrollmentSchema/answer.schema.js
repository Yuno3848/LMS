import mongoose, { Schema } from 'mongoose';

export const answerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  studentAnswer: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
    required: true,
  },
  pointsEarned: {
    type: Number,
    min: 0,
    required: true,
  },
});
