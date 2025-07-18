import { body } from 'express-validator';
import { param } from 'express-validator';

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
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email address'),

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

export const validateVerifyEmail = () => {
  return [
    param('token')
      .notEmpty()
      .withMessage('Token is required')
      .isString()
      .withMessage('Token must be a string'),
  ];
};

export const validateloginUser = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email address'),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ];
};

export const validateForgotPassword = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email address'),
  ];
};

export const validateResetPassword = () => {
  return [
    param('token')
      .notEmpty()
      .withMessage('Token is required')
      .isString()
      .withMessage('Token must be a string'),
    body('newPassword')
      .notEmpty()
      .withMessage('New password is required')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters long'),
    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirm password is required')
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),
  ];
};

export const validateProfile = () => {
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
  ];
};
