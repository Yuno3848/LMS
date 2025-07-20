import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLoggedd.middleware.js';
import { validateInstructorProfile } from '../validators/instructorProfile.validator.js';
import {
  createInstructorProfile,
  updateInstructoProfile,
  verifyInstructor,
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
  updateInstructoProfile,
);

instructor.get(
  '/verify-instructor-profile',
  validateInstructorProfile(),
  validatorError,
  isLogged,
  verifyInstructor,
);
export default instructor;
