import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLogged.middleware.js';
import { validateInstructorProfile } from '../validators/instructorProfile.validator.js';
import {
  createInstructorProfile,
  getInstructorProfile,
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

instructor.post(
  '/update-instructor-profile',
  validateInstructorProfile(),
  validatorError,
  isLogged,
  updateInstructorProfile,
);

instructor.get('/get-instructor-profile', isLogged, getInstructorProfile);
instructor.get('/req-instructor-role', isLogged, reqInstructorRole);
export default instructor;
