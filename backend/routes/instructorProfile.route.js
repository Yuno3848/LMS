import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLoggedd.middleware.js';
import { validateInstructorProfile } from '../validators/instructorProfile.validator.js';
import {
  createInstructorProfile,
  updateInstructoProfile,
  verifyInstructor,
} from '../controllers/instructorProfile.controller.js';
import { instructorRole } from '../middlewares/instructor.middleware.js';

const instructor = Router();

instructor.post(
  '/create-instructor-profile',
  validateInstructorProfile(),
  validatorError,
  isLogged,
  instructorRole,
  createInstructorProfile,
);

instructor.patch(
  '/update-instructor-profile',
  validateInstructorProfile(),
  validatorError,
  isLogged,
  instructorRole,
  updateInstructoProfile,
);

instructor.get(
  '/verify-instructor-profile',
  validateInstructorProfile(),
  validatorError,
  isLogged,
  instructorRole,
  verifyInstructor,
);
export default instructor;
