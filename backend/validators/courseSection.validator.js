import { body, param } from 'express-validator';

export const validateCourseSection = () => {
  return [
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required')
      .isString()
      .withMessage('Description must be a string')
      .isLength({ min: 10, max: 1000 })
      .withMessage('Description must be between 10 and 1000 characters'),

    body('requirements')
      .trim()
      .notEmpty()
      .withMessage('Requirements is required')
      .isString()
      .withMessage('Requirements must be a string')
      .isLength({ min: 5, max: 500 })
      .withMessage('Requirements must be between 5 and 500 characters'),
    param('courseId')
      .notEmpty()
      .withMessage('cousreId is required ')
      .isString()
      .withMessage('course id must be string'),
  ];
};

export const validateUpdateCourseSection = () => {
  return [
    body('description')
      .isString()
      .withMessage('Description must be a string.')
      .notEmpty()
      .withMessage('Description is required.')
      .isLength({ max: 300 })
      .withMessage('Description must not exceed 300 characters.'),

    body('requirements')
      .isString()
      .withMessage('Description must be a string.')
      .notEmpty()
      .withMessage('Description is required.'),
    param('courseId')
      .notEmpty()
      .withMessage('cousreId is required ')
      .isString()
      .withMessage('course id must be string'),

    param('courseSectionId')
      .notEmpty()
      .withMessage('course section is required')
      .isString()
      .withMessage('course section id must be string'),
  ];
};

export const validateCourseSectionAndId = () => {
  return [
    param('courseId')
      .notEmpty()
      .withMessage('cousreId is required ')
      .isString()
      .withMessage('course id must be string'),
    param('courseSectionId')
      .notEmpty()
      .withMessage('course section is required')
      .isString()
      .withMessage('course section id must be string'),
  ];
};
