import mongoose, { Schema } from 'mongoose';

const subItemSectionSchema = new Schema({
  itemType: {
    type: String,
    enum: ['video', 'quiz', 'text'],
    required: true,
  },

  title: { type: String },
  content: { type: String },
  duration: { type: Number },
  contentUrl: { type: String },
  orderIndex: { type: Number },
  questions: [
    {
      question: String,
      options: [{ type: String }],
      correctAnswer: { type: String },
      explanation: { type: String },
    },
  ],
  maxScore: { type: Number },
});

export const subItemSection = mongoose.model('SubItemSection', subItemSectionSchema);
