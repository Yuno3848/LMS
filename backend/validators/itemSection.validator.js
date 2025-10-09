import { body, param } from 'express-validator';

export const validateCreateItemSection = () => {
  return [
    param('courseId')
      .notEmpty()
      .withMessage('course section id is required')
      .isString()
      .withMessage('course section id must be a string'),
    body('title')
      .notEmpty()
      .withMessage('course section title is required')
      .isString()
      .withMessage('title must be a string')
      .isLength({ max: 150 })
      .withMessage("title can't be more than 150 characters"),
  ];
};

export const validateUpdateItemSection = () => {
  return [
    param('itemSectionId')
      .notEmpty()
      .withMessage('course section id is required')
      .isString()
      .withMessage('course section id must be a string'),

    body('title')
      .notEmpty()
      .withMessage('course section id is required')
      .isString()
      .withMessage('title must be a string')
      .isLength({ max: 150 })
      .withMessage("title can't be more than 150 characters"),
  ];
};

export const validateItemSection = () => {
  return [
    param('itemSectionId')
      .notEmpty()
      .withMessage('course section id is required')
      .isString()
      .withMessage('course section id must be a string'),
  ];
};

export const validateGetAllItemSection = () => {
  return [
    param('courseSectionId')
      .notEmpty()
      .withMessage('course section id is required')
      .isString()
      .withMessage('course section id must be a string'),
  ];
};
