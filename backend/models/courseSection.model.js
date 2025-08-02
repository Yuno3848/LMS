import mongoose, { Schema } from 'mongoose';

const courseSectionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },

  requirements: {
    type: String,
    trim: true,
    required: true,
  },

  itemSection: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ItemSection',
    },
  ],
});

export const courseSection = mongoose.model('courseSection', courseSectionSchema);
