import mongoose, { Schema } from 'mongoose';

const instructorProfileSchema = new Schema(
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
      type: String,
      enum: ['not_requested', 'pending', 'verified', 'rejected'],
      default: 'not_requested',
    },
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

export const instructorProfile = mongoose.model('instructorProfile', instructorProfileSchema);
