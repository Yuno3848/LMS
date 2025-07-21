import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLoggedd.middleware.js';
import { validateInstructorProfile } from '../validators/instructorProfile.validator.js';
import { validateCreateCourse } from '../validators/course.validator.js';
import { createCourse } from '../controllers/course.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const course = Router();

course.post(
  '/create-course',
  upload.single('thumbnail'),
  validateCreateCourse(),
  validatorError,
  isLogged,
  createCourse,
);

export default course;
