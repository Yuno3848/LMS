import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import {
  validateForgotPassword,
  validateloginUser,
  validateRegistration,
  validateResetPassword,
  validateVerifyEmail,
} from '../validators/validator.js';
import { validatorError } from '../middlewares/validatorError.js';
import {
  forgotPassword,
  loginUser,
  logoutUser,
  profile,
  registeredUser,
  resetPassword,
  verifyMail,
} from '../controllers/auth.controller.js';
import { isLogged } from '../middlewares/isLoggedd.middleware.js';

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
auth.get('/forgot-password', validateForgotPassword(), validatorError, forgotPassword);

auth.patch('/reset-password/:token', validateResetPassword(), validatorError, resetPassword);

auth.get('/profile', isLogged, profile);
export default auth;
