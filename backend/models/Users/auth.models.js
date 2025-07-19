import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { instructorProfileSchema } from './authSchema/instructorProfile.schema.js';
import { studentProfileSchema } from './authSchema/studentProfile.schema.js';
dotenv.config();
const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: '',
        localPath: '',
      },
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },

    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
    },

    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerifiedToken: {
      type: String,
    },
    emailVerificationTokenExpiry: {
      type: Date,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },

    instructorProfile: {
      type: Schema.Types.ObjectId,
      ref: 'instructorProfile',
    },
    studentProfile: { type: Schema.Types.ObjectId, ref: 'studentProfile' },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      role: this.role,
      email: this.email,
    },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      role: this.role,
      email: this.email,
    },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN },
  );
};

userSchema.methods.generateTemporaryToken = function () {
  const unhashedToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(unhashedToken).digest('hex');
  const tokenExpiry = Date.now() + 20 * 60 * 1000;
  return { unhashedToken, hashedToken, tokenExpiry };
};
const User = mongoose.model('User', userSchema);
export default User;
