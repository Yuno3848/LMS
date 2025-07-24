import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLoggedd.middleware.js';

import { validateCourseId, validateCreateCourse } from '../validators/course.validator.js';
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  isPublish,
} from '../controllers/course.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { instructorRole } from '../middlewares/instructor.middleware.js';

const course = Router();

course.post(
  '/create-course',
  upload.single('thumbnail'),
  validateCreateCourse(),
  validatorError,
  isLogged,
  instructorRole,
  createCourse,
);

course.get('/get-all-course', isLogged, instructorRole, getAllCourses);
course.get(
  '/isPublish/:courseId',
  validateCourseId(),
  validatorError,
  isLogged,
  instructorRole,
  isPublish,
);
course.get(
  '/get-course-by-id/:courseId',
  validateCourseId(),
  validatorError,
  isLogged,
  instructorRole,
  getCourseById,
);
course.get('/delete-course/:courseId', validateCourseId, isLogged, instructorRole, deleteCourse);
export default course;
