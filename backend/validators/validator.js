import { body } from 'express-validator';

export const validateRegistration = () => {
  return [
    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long'),
    body('fullname')
      .notEmpty()
      .withMessage('Full name is required')
      .isLength({ min: 3 })
      .withMessage('Full name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirm password is required')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),
  ];
};
