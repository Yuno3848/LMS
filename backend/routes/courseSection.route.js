import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLoggedd.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import {
  validateCourseSection,
  validateCourseSectionAndId,
  validateUpdateCourseSection,
} from '../validators/courseSection.validator.js';
import {
  createCourseSection,
  deleteCourseSection,
  getAllCourseSection,
  getCourseSectionById,
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
  validateCourseSectionAndId(),
  validatorError,
  isLogged,
  deleteCourseSection,
);

courseSection.get('/get-all-course-section', isLogged, getAllCourseSection);

courseSection.get(
  '/get-course-section-by-id/:courseId/:courseSectionId',
  validateCourseSectionAndId(),
  validatorError,
  isLogged,
  getCourseSectionById,
);

export default courseSection;
