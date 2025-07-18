export const studentProfileSchema = new Schema(
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
    education: {
      type: String,
      trim: true,
    },
    interests: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    isVerifiedStudent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
