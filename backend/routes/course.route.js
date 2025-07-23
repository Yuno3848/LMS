import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLoggedd.middleware.js';
import { validateInstructorProfile } from '../validators/instructorProfile.validator.js';
import { validateCourseId, validateCreateCourse } from '../validators/course.validator.js';
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  isPublish,
} from '../controllers/course.controller.js';
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

course.get('/get-all-course', isLogged, getAllCourses);
course.get('/isPublish/:courseId', validateCourseId, isLogged, isPublish);
course.get('/get-course-by-id/:courseId', validateCourseId, isLogged, getCourseById);
course.get('/delete-course/:courseId', validateCourseId, isLogged, deleteCourse);
export default course;
