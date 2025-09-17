import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLogged.middleware.js';
import { validateInstructorProfile } from '../validators/instructorProfile.validator.js';
import {
  createInstructorProfile,
  reqInstructorRole,
  updateInstructorProfile,
} from '../controllers/instructorProfile.controller.js';

const instructor = Router();

instructor.post(
  '/create-instructor-profile',
  validateInstructorProfile(),
  validatorError,
  isLogged,
  createInstructorProfile,
);

instructor.patch(
  '/update-instructor-profile',
  validateInstructorProfile(),
  validatorError,
  isLogged,
  updateInstructorProfile,
);

instructor.get('/req-instructor-role', isLogged, reqInstructorRole);
export default instructor;
