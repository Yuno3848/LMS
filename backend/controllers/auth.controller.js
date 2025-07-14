import User from '../models/Users/auth.models.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary';

export const registeredUser = asyncHandler(async (req, res) => {
  // user details from request body
  const { username, fullname, email, password, confirmPassword } = req.body;
  //validate required fields in validator.js

  //check whether user exists in the database
  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });
  // if user exists, throw an error
  if (isUserExist) {
    throw new Error(400, 'Username or Email already exists');
  }
  //fetch the path of the uploaded avatar file
  const avatarLocalPath = req?.files?.avatar?.[0]?.path || null;
  // if avatar is not provided, throw an error
  if (!avatarLocalPath) {
    throw new Error(400, 'Avatar is required');
  }
  // upload avatar to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  // if upload fails, throw an error
  if (!avatar) {
    throw new Error(500, 'Failed to upload avatar');
  }
  // create a new user instance
  const newUser = new User({
    username: username.toLowerCase(),
    fullname,
    email,
    password,
    avatar: {
      url: avatar.url,
      localPath: avatarLocalPath,
    },
  });
  //save the new user to the database
  await newUser.save();

  // exclude sensitive fields from the response
  const createdUser = await User.findById(
    newUser._id,
    {
      password: 0,
      emailVerifiedToken: 0,
      emailVerificationTokenExpiry: 0,
      forgotPasswordExpiry: 0,
      isEmailVerified: 0,
    },
    { lean: true },
  );
  // send the response with the created user data
  res.status(201).json(new ApiResponse(201, 'User registered successfully', createdUser));
});
