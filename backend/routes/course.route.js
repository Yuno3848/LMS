import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLogged.middleware.js';

import {
  validateCouponToCourse,
  validateCourseId,
  validateCreateCourse,
} from '../validators/course.validator.js';
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  isPublish,
} from '../controllers/course.controller.js';
import multerPath from '../middlewares/multer.middleware.js';

const course = Router();

course.post(
  '/create-course',
  multerPath('./public/thumbnail').single('thumbnail'),
  validateCreateCourse(),
  validatorError,
  isLogged,
  createCourse,
);

course.get('/get-all-course', isLogged, getAllCourses);
course.get('/isPublish/:courseId', validateCourseId(), validatorError, isLogged, isPublish);
course.get(
  '/get-course-by-id/:courseId',
  validateCourseId(),
  validatorError,
  isLogged,
  getCourseById,
);
course.get('/delete-course/:courseId', validateCourseId(), validatorError, isLogged, deleteCourse);

export default course;
