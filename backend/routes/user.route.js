import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import {
  validateloginUser,
  validateRegistration,
  validateVerifyEmail,
} from '../validators/validator.js';
import { validatorError } from '../middlewares/validatorError.js';
import {
  forgotPassword,
  loginUser,
  logoutUser,
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
auth.get('/forgot-password', isLogged, forgotPassword);

auth.patch('/reset-password/:token', isLogged, resetPassword);

export default auth;
