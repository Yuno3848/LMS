import mongoose, { Schema } from 'mongoose';

const subItemSectionSchema = new Schema({
  itemType: {
    type: String,
    enum: ['video', 'assignment', 'quiz'],
    required: true,
  },

  title: { type: String },
  content: { type: String },
  duration: { type: Number },
  contentUrl: {
    type: {
      url: String,
      localPath: String,
    },
    default: {
      url: '',
      localPath: '',
    },
  },
  orderIndex: { type: Number },

});

export const subItemSection = mongoose.model('SubItemSection', subItemSectionSchema);
