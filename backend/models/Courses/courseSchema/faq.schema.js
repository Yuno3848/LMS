import mongoose, { Schema } from 'mongoose';

export const faqSchema = new Schema({
  question: {
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
