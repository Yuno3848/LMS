import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { validateRegistration, validateVerifyEmail } from '../validators/validator.js';
import { validatorError } from '../middlewares/validatorError.js';
import { forgotPassword } from '../controllers/auth.controller.js';

const auth = Router();
auth.post('/register', upload, validateRegistration(), validatorError, registeredUser);

auth.get('/verify-email/:token', validateVerifyEmail(), validatorError, validateVerifyEmail);

auth.post('/login', validateloginUser(), validatorError, loginUser);
auth.get('forgot-password', forgotPassword);
