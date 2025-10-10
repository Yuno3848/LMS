import { Router } from 'express';

import {
  validateChangePassword,
  validateForgotPassword,
  validateloginUser,
  validateProfile,
  validateRegistration,
  validateResetPassword,
  validateVerifyEmail,
} from '../validators/auth.validator.js';
import { validatorError } from '../middlewares/validatorError.js';
import {
  changePassword,
  forgotPassword,
  loginUser,
  logoutUser,
  me,
  profile,
  refreshAccessToken,
  registeredUser,
  resetPassword,
  updateProfile,
  updateProfileAvatar,
  verifyMail,
} from '../controllers/auth.controller.js';

import { isLogged } from '../middlewares/isLogged.middleware.js';
import upload from '../middlewares/multer.middleware.js';
const auth = Router();

auth.post(
  '/register',
  upload.single('avatar'),
  validateRegistration(),
  validatorError,
  registeredUser,
);

auth.get('/verify-email/:token', validateVerifyEmail(), validatorError, verifyMail);

auth.post('/login', validateloginUser(), validatorError, loginUser);
auth.get('/logout', isLogged, logoutUser);
auth.post('/forgot-password', validateForgotPassword(), validatorError, forgotPassword);

auth.patch('/reset-password/:token', validateResetPassword(), validatorError, resetPassword);

auth.get('/profile', isLogged, profile);

auth.get('/refresh-token', isLogged, refreshAccessToken);
auth.patch('/update-profile', validateProfile(), validatorError, isLogged, updateProfile);
auth.patch('/change-password', validateChangePassword(), validatorError, isLogged, changePassword);
auth.patch('/update-avatar', upload.single('avatar'), isLogged, updateProfileAvatar);

auth.get('/me', isLogged, me);
export default auth;
