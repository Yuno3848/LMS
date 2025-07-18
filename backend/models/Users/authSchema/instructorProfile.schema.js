import mongoose, { Schema } from 'mongoose';

export const instructorProfileSchema = new Schema(
  {
    bio: {
      type: String,
      trim: true,
    },
    expertise: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    socialLinks: {
      linkedin: String,
      twitter: String,
      facebook: String,
      instagram: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    isVerifiedInstructor: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
  },
  { timestamps: true },
);
