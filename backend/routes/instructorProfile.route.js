import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLoggedd.middleware.js';
import { validateInstructorProfile } from '../validators/instructorProfile.validator.js';
import {
  createInstructorProfile,
  reqInstructorRole,
  updateInstructoProfile,
} from '../controllers/instructorProfile.controller.js';
import { instructorRole } from '../middlewares/instructor.middleware.js';

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

instructor.get('/req-instructor-role', isLogged, reqInstructorRole);
export default instructor;
