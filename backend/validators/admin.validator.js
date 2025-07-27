import { body } from 'express-validator';
import { param } from 'express-validator';

export const validateInstructorId = () => {
  return [
    param('instructorId')
      .notEmpty()
      .withMessage("instructor id can't be empty")
      .isString()
      .withMessage('instructor id must be a string'),
  ];
};
