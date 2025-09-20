import mongoose, { Schema } from 'mongoose';

const studentProfileSchema = new Schema(
  {
    bio: {
      type: String,
      trim: true,
    },
    skills: [
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
    education: [{
      type: String,
      trim: true,
    }],
    interests: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    verificationStatus: {
      type: String,
      enum: ['not requested', 'pending', 'verified', 'rejected'],
      default: 'not requested',
    },
  },
  { timestamps: true },
);
export const studentProfile = mongoose.model('studentProfile', studentProfileSchema);
