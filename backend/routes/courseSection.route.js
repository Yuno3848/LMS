import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLoggedd.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import {
  validateCourseSection,
  validateDeleteCourseSection,
  validateUpdateCourseSection,
} from '../validators/courseSection.validator.js';
import {
  createCourseSection,
  deleteCourseSection,
  updateCourseSection,
} from '../controllers/courseSection.controller.js';

const courseSection = Router();
courseSection.post(
  '/create-course-section/:courseId',
  upload.single('thumbnail'),
  validateCourseSection(),
  validatorError,
  isLogged,
  createCourseSection,
);

courseSection.patch(
  '/update-course-section/:courseId/:courseSectionId',
  upload.single('thumbnail'),
  validateUpdateCourseSection(),
  validatorError,
  isLogged,
  updateCourseSection,
);

courseSection.delete(
  '/delete-course-section/:courseId/:courseSectionId',
  validateDeleteCourseSection(),
  validatorError,
  isLogged,
  deleteCourseSection,
);

export default courseSection;
