import { body } from 'express-validator';
import mongoose from 'mongoose';

export const validateCreateCourse = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('title field is required.')
      .isString()
      .withMessage('title must be string.')
      .isLength({ max: 200 })
      .withMessage('title can not be more than 200 characters')
      .trim(),

    body('description')
      .notEmpty()
      .withMessage('description field is required.')
      .isString()
      .withMessage('description must be string.')
      .isLength({ max: 600 })
      .withMessage('description can not be more than 600 characters')
      .trim(),

    body('isPublished').optional().isBoolean().withMessage('It can be either true or false'),

    body('courseSection')
      .optional()
      .isArray()
      .withMessage('Course section must be an array')
      .custom((arr) => arr.every((id) => mongoose.Types.ObjectId.isValid(id)))
      .withMessage('Each course must be an valid mongo objectId'),

    body('price.base')
      .notEmpty()
      .withMessage('Base price is required')
      .isFloat({ min: 0 })
      .withMessage('Base price must be a number ≥ 0'),

    body('price.final')
      .notEmpty()
      .withMessage('Final price is required')
      .isFloat({ min: 0 })
      .withMessage('Final price must be a number ≥ 0'),

    body('price.currency')
      .optional()
      .isIn(['INR', 'USD'])
      .withMessage('Currency must be INR or USD'),

    body('courseExpiry')
      .notEmpty()
      .withMessage('course expiry field can not be empty')
      .isISO8601()
      .toDate()
      .withMessage('Course expiry must be a valid date'),

    body('difficulty')
      .optional()
      .isIn(['beginner', 'intermediate', 'advance'])
      .withMessage('Difficulty must be beginner, intermediate, or advance'),

    body('tags')
      .optional()
      .isArray()
      .withMessage('tags must be an array')
      .custom((tags) => tags.every((tag) => typeof tag === 'string'))
      .withMessage('each tag must be a string'),

    body('category')
      .notEmpty()
      .withMessage('Category is required')
      .isString()
      .withMessage('Category must be a string')
      .trim(),
  ];
};
