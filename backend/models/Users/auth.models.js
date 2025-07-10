import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: "",
        localPath: "",
      },
    },
    username: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      trim: true,
      require: true,
      lowercase: true,
    },

    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    DOB: {
      type: Date,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
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
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      username: this.username,
      role: this.role,
      email: this.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      username: this.username,
      role: this.role,
      email: this.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" }
  );
};

userSchema.methods.generateTemporaryToken = function () {
  const unhashedToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex");
  const tokenExpiry = Date.now() + 20 * 60 * 1000;
  return { unhashedToken, hashedToken, tokenExpiry };
};
const User = mongoose.model("User", userSchema);
export default User;
