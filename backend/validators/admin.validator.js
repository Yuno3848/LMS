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

export const validateDeleteUserId = () => {
  return [
    param('userIdDelete')
      .notEmpty()
      .withMessage("userIdDelete id can't be empty")
      .isString()
      .withMessage('userIdDelete id must be a string'),
  ];
};
