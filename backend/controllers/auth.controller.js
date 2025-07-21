import crypto from 'crypto';
import User from '../models/auth.models.js';
import ApiResponse from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { forgotPasswordMail, generateMail, sendMail } from '../utils/mail.js';
import ApiError from '../utils/ApiError.js';

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
    throw new ApiError(400, 'Username or Email already exists');
  }

  //fetch the path of the uploaded avatar file
  const avatarLocalPath = req?.file?.path || null;
  // if avatar is not provided, throw an error
  if (!avatarLocalPath) {
    throw new ApiError(400, 'Avatar is required');
  }
  // upload avatar to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  // if upload fails, throw an error
  if (!avatar) {
    throw new ApiError(500, 'Failed to upload avatar');
  }

  // create a new user instance
  const newUser = await User.create({
    username: username.toLowerCase(),
    fullname,
    email,
    password,

    avatar: {
      url: avatar.url,
      localPath: avatarLocalPath,
    },
  });
  // if user creation fails, throw an error
  if (!newUser) {
    throw new ApiError(500, 'Failed to create user');
  }
  // generate email verification token
  const { unhashedToken, hashedToken, tokenExpiry } = newUser.generateTemporaryToken();
  newUser.emailVerifiedToken = hashedToken;
  newUser.emailVerificationTokenExpiry = tokenExpiry;

  //save the new user to the database
  await newUser.save();
  //send email verification link to the user
  await sendMail({
    username: newUser.username,
    email: newUser.email,
    subject: 'Email Verification',
    mailGenContent: generateMail(
      newUser.username,
      `${process.env.BASE_URL}/api/v1/auth/verify-email/${unhashedToken}`,
    ),
  });
  // exclude sensitive fields from the response
  const createdUser = await User.findById(
    newUser.id,
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

export const verifyMail = asyncHandler(async (req, res) => {
  // Extract token from query parameters
  const { token } = req.params;
  //create a hash of the token to match with the stored token
  const emailVerifiedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Find user by email verification token
  const user = await User.findOne({
    emailVerifiedToken,
    emailVerificationTokenExpiry: { $gt: Date.now() },
  }).select(
    '-password -emailVerifiedToken -emailVerificationTokenExpiry -forgotPasswordExpiry -isEmailVerified',
  );

  // If user not found, throw an error
  if (!user) {
    throw new ApiError(404, 'User not found or token is invalid');
  }

  // Update user's email verification status
  user.isEmailVerified = true;
  user.emailVerifiedToken = undefined;
  user.emailVerificationTokenExpiry = undefined;

  // Save the updated user document
  await user.save();

  // Send success response
  res.status(200).json(new ApiResponse(200, 'Email verified successfully', user));
});

//function for generating access and refresh tokens
const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  // Generate access token
  const accessToken = user.generateAccessToken();
  // Generate refresh token
  const refreshToken = user.generateRefreshToken();

  // Save the refresh token in the user's document
  user.refreshToken = refreshToken;
  // Save the user document with the new refresh token
  await user.save();
  // Return both tokens
  return { accessToken, refreshToken };
};

// Function to handle user login
export const loginUser = asyncHandler(async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email }).select(
    '-emailVerifiedToken -emailVerificationTokenExpiry -forgotPasswordExpiry -isEmailVerified',
  );
  // If user not found, throw an error
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  // Check if the password is correct
  const isPasswordValid = await user.comparePassword(password);
  // If password is invalid, throw an error
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid password');
  }
  // Generate access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
  // If tokens are not generated, throw an error
  if (!accessToken || !refreshToken) {
    throw new ApiError(500, 'Failed to generate tokens');
  }
  // Set cookies for access and refresh tokens
  const acccesTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  };
  // Set cookies for refresh token
  const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  // Exclude sensitive fields from the user response
  const userResponse = await User.findById(
    user.id,
    {
      password: 0,
      emailVerifiedToken: 0,
      emailVerificationTokenExpiry: 0,
      forgotPasswordExpiry: 0,
      isEmailVerified: 0,
    },
    { lean: true },
  );
  // If user response is not found, throw an error

  if (!userResponse) {
    throw new ApiError(404, 'User not found');
  }
  // Send the response with the tokens and user data
  return res
    .status(200)
    .cookie('accessToken', accessToken, acccesTokenCookieOptions)
    .cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
    .json(new ApiResponse(200, 'User logged in successfully', userResponse));
});

export const logoutUser = asyncHandler(async (req, res) => {
  // Clear the cookies for access and refresh tokens
  res
    .clearCookie('accessToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    .clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    .status(200)
    .json(new ApiResponse(200, 'User logged out successfully'));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  // Extract email from request body
  const { email } = req.body;

  //Find user by email
  const user = await User.findOne({ email }).select(
    '-emailVerifiedToken -emailVerificationTokenExpiry',
  );
  if (!user) {
    throw new ApiError(400, `User not found`);
  }

  // Generate access and refresh tokens
  const { accessToken, refreshToken } = await user._id;
  // If tokens are not generated, throw an error
  if (!accessToken || !refreshToken) {
    throw new ApiError(500, 'Failed to generate tokens');
  }
  // generate email verification token
  const { unhashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();
  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;

  //save the new user to the database
  await user.save();
  //send email verification link to the user
  await sendMail({
    username: user.username,
    email: user.email,
    subject: 'Email Verification',
    mailGenContent: forgotPasswordMail(
      user.username,
      `${process.env.BASE_URL}/api/v1/auth/reset-password/${unhashedToken}`,
    ),
  });

  // Send the response
  return res.status(200).json(
    new ApiResponse(200, 'Password forgot successfully', {
      _id: user.id,
      email: user.email,
      password: user.password,
      username: user.username,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }),
  );
});
export const resetPassword = asyncHandler(async (req, res) => {
  // Extract token and password from request
  console.log('Reset password request received');
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  // Hash the token to match with the stored token
  const forgotPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
  // Find user by forgot password token and check if the token is still valid
  const user = await User.findOneAndUpdate(
    {
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    },
    {
      $set: {
        password: newPassword,
        isEmailVerified: true,
        forgotPasswordToken: undefined,
        forgotPasswordExpiry: undefined,
      },
    },
    {
      new: true,
    },
  );
  // If user not found, throw an error
  if (!user) {
    throw new ApiError(404, 'user or token not found...');
  }
  // Save the updated user document
  await user.save();
  // Send success response
  return res.status(200).json(new ApiResponse(200, 'password reset successfully...', user));
});

export const changePassword = asyncHandler(async (req, res) => {
  //get user id from request from object
  const userId = req.user.id;

  const { password, confirmPassword } = req.body;
  //If user is not found, throw an error
  if (!userId) {
    throw new ApiError(401, 'User not authenticated.');
  }
  //find user
  const user = await User.findById(userId).select(
    '-password -emailVerificationTokenExpiry -forgotPasswordExpiry -forgotPasswordToken -refreshToken',
  );
  //sav
  user.password = password;
  await user.save();
  //if user is not found, throw an error
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return res.status(200).json(new ApiResponse(200, 'password changed successfully', user));
});

export const profile = asyncHandler(async (req, res) => {
  // Get user from request object
  const user = req.user.id;

  // If user is not found, throw an error
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Exclude sensitive fields from the response
  const userResponse = await User.findById(
    user,
    {
      password: 0,
      emailVerifiedToken: 0,
      emailVerificationTokenExpiry: 0,
      forgotPasswordExpiry: 0,
      isEmailVerified: 0,
    },
    { lean: true },
  );
  // If user response is not found, throw an error
  if (!userResponse) {
    throw new ApiError(404, 'User not found');
  }
  // Send the response with the user data
  res.status(200).json(new ApiResponse(200, 'User profile fetched successfully', userResponse));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  // Get user id from cookies
  const userId = req.user.id;
  // If user id is not found, throw an error
  if (!userId) {
    throw new ApiError(401, 'Refresh token not found');
  }
  // Find user by refresh token
  const user = await User.findById(userId).select(
    '-emailVerifiedToken -emailVerificationTokenExpiry -forgotPasswordExpiry -isEmailVerified',
  );
  // If user not found, throw an error
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  // Generate a new access token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
  // If access token is not generated, throw an error
  if (!accessToken || !refreshToken) {
    throw new ApiError(500, 'Failed to generate access token');
  }
  // Set cookies for access and refresh tokens
  const acccesTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  };
  // Set cookies for refresh token
  const refreshTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  // Send the response with the new access token
  res
    .status(200)
    .cookie('accessToken', accessToken, acccesTokenCookieOptions)
    .cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
    .json(
      new ApiResponse(200, 'Access token refreshed successfully', {
        accessToken,
        refreshAccessToken,
      }),
    );
});

export const updateProfile = asyncHandler(async (req, res) => {
  //get id from cookies
  const userId = req.user.id;
  console.log('userId', userId);
  const { username, fullname } = req.body;
  // If user id is not found, throw an error
  if (!userId) {
    throw new ApiError(401, 'User not authenticated');
  }
  // Find user by id and update
  const user = await User.findByIdAndUpdate(
    userId,
    {
      username,
      fullname,
    },
    {
      new: true,
    },
  ).select(
    '-password -emailVerifiedToken -emailVerificationTokenExpiry -forgotPasswordExpiry -forgotPasswordToken -refreshToken',
  );
  // If user not found, throw an error
  if (!user) {
    throw new ApiError(404, ' User not found');
  }
  // Send the response with the user details
  return res.status(200).json(new ApiResponse(200, 'profile updated successfully', user));
});

export const updateProfileAvatar = asyncHandler(async (req, res) => {
  //extract user id from cookies
  const userId = req.user.id;

  if (!userId) {
    throw new ApiError(401, 'User not authenticated');
  }
  // find user by id
  const user = await User.findById(userId).select(
    '-password -emailVerifiedToken -emailVerificationTokenExpiry -forgotPasswordExpiry -forgotPasswordToken -refreshToken',
  );
  //if user not found, throw an error
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  //fetch avatar local path
  const avatarLocalPath = req.file?.path || null;

  // if avatar is not provided, throw an error
  if (!avatarLocalPath) {
    throw new ApiError(404, 'Avatar is required');
  }
  // upload avatar to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(500, 'failed to upload avatar');
  }
  // update user avatar
  user.avatar.url = avatar.url;
  // update user avatar local path
  user.avatar.localPath = avatarLocalPath;
  // save the user document
  user.save();
  // send the response with the updated user data
  return res.status(200).json(new ApiResponse(200, 'avatar updated successfully', user));
});
