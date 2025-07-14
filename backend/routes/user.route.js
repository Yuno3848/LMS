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
  registeredUser,
  verifyMail,
} from '../controllers/auth.controller.js';

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
auth.get('forgot-password', forgotPassword);
export default auth;
