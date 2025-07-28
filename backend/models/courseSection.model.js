import mongoose, { Schema } from 'mongoose';

const courseSectionSchema = new Schema({
  title: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },

  thumbnail: {
    type: {
      url: String,
      localPath: String,
    },
    default: {
      url: '',
      localPath: '',
    },
  },

  requirements: {
    type: String,
    trim: true,
    required: true,
  },

  itemSection: {
    type: Schema.Types.ObjectId,
    ref: 'itemSectionSchema',
  },
});

export const courseSection = mongoose.model('courseSection', courseSectionSchema);
