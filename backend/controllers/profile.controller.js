import User from '../models/Users/auth.models.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createStudentProfile = async (req, res) => {
  // Check if the user is logged in
  const userId = req.user.id;
  // If userId is not present, throw an error
  if (!userId) {
    throw new ApiError(401, 'User not authenticated');
  }
  // Find the user by ID
  const user = await User.findById(userId).populate('studentProfile');
  // If user is not found, throw an error

  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  // Check if the user already has a student profile
  if (user.studentProfile) {
    throw new ApiError(400, 'Student profile already exists');
  }
  // Create a new student profile
  const { bio, skills, socialLinks, education, interests } = req.body;
  const studentProfile = {
    bio,
    skills,
    socialLinks,
    education,
    interests,
  };
  // Assign the student profile to the user
  user.studentProfile = studentProfile;
  // Save the user document
  await user.save();
  // Return the updated user with the new student profile
  return res.status(201).json(new ApiResponse(201, 'Student profile created successfully', user));
};
