import { body, param } from 'express-validator';

export const validateCart = () => {
  return [
    param('courseId')
      .notEmpty()
      .withMessage("param id can't be empty")
      .isString()
      .withMessage('course id must be a string!'),
  ];
};
