import mongoose, { Schema } from 'mongoose';

const courseSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
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
      required: true,
    },

    price: {
      type: {
        base: {
          type: Number,
          required: true,
          min: 0,
        },
        final: {
          type: Number,
          required: true,
          min: 0,
        },
        currency: {
          type: String,
          enum: ['INR', 'USD'],
          default: 'INR',
        },
      },
      required: true,
    },

    courseExpiry: {
      type: Date,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    courseSection: [
      {
        type: Schema.Types.ObjectId,
        ref: 'courseSection',
      },
    ],

    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advance'],
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      required: true,
      trim: true,
    },

    coupon: {
      type: Schema.Types.ObjectId,
      ref: 'Coupon',
    },

    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const Course = mongoose.model('Course', courseSchema);
