import { body, param } from 'express-validator';

export const validateCourseSection = () => {
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

export const validateDeleteCourseSection = () => {
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
