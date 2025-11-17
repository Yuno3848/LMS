import { body } from 'express-validator';

const enrolledCourseValidate = () => {
  return [
    body('courseIds')
      .notEmpty()
      .withMessage("course ids can't be empty")
      .isArray('courseIds')
      .withMessage('course ids must be an array'),
  ];
};
