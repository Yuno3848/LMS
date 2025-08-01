import mongoose, { Schema } from 'mongoose';

const itemSectionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  totalLectures: {
    type: Number,
    required: true,
  },
  orderIndex: Number,
  subItemSection: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SubItemSection',
    },
  ],
});
export const ItemSection = mongoose.model('ItemSection', itemSectionSchema);
