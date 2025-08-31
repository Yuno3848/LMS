import { body, param } from 'express-validator';

export const validateCreateSubItemSection = () => {
  return [
    body('itemType')
      .notEmpty()
      .withMessage('itemType is required')
      .isIn(['video', 'quiz', 'text', 'assignment'])
      .withMessage('itemType must be video, quiz, text, or assignment'),

    body('title')
      .notEmpty()
      .withMessage('title is required')
      .isString()
      .withMessage('title must be a string'),

    body('content').optional().isString().withMessage('content must be a string'),

    body('duration').optional().isNumeric().withMessage('duration must be a number'),

    body('contentUrl').optional().isURL().withMessage('contentUrl must be a valid URL'),

    body('orderIndex').optional().isNumeric().withMessage('orderIndex must be a number'),

    body('questions').optional().isArray().withMessage('questions must be an array'),

    body('questions.*.question')
      .optional()
      .isString()
      .withMessage('Each question must have a string question'),

    body('questions.*.options')
      .optional()
      .isArray()
      .withMessage('options must be an array of strings'),

    body('questions.*.correctAnswer')
      .optional()
      .isString()
      .withMessage('correctAnswer must be a string'),

    body('questions.*.explanation')
      .optional()
      .isString()
      .withMessage('explanation must be a string'),

    body('maxScore').optional().isNumeric().withMessage('maxScore must be a number'),
  ];
};

export const validateDeleteSubItemSection = () => {
  return [
    param('subItemId')
      .notEmpty()
      .withMessage("item section id can't be empty")
      .isString()
      .withMessage('item section id must be a string')
  ];
};

export const validateUpdateSubItemSection = () => {
  return [
   
    param('subItemId')
      .notEmpty()
      .withMessage("item section id can't be empty")
      .isString()
      .withMessage('item section id must be a string'),
    body('itemType')
      .notEmpty()
      .withMessage('itemType is required')
      .isIn(['video', 'quiz', 'text', 'assignment'])
      .withMessage('itemType must be video, quiz, text, or assignment'),

    body('title')
      .notEmpty()
      .withMessage('title is required')
      .isString()
      .withMessage('title must be a string'),

    body('content').optional().isString().withMessage('content must be a string'),

    body('duration').optional().isNumeric().withMessage('duration must be a number'),

    body('contentUrl').optional().isURL().withMessage('contentUrl must be a valid URL'),

    body('orderIndex').optional().isNumeric().withMessage('orderIndex must be a number'),

    body('questions').optional().isArray().withMessage('questions must be an array'),

    body('questions.*.question')
      .optional()
      .isString()
      .withMessage('Each question must have a string question'),

    body('questions.*.options')
      .optional()
      .isArray()
      .withMessage('options must be an array of strings'),

    body('questions.*.correctAnswer')
      .optional()
      .isString()
      .withMessage('correctAnswer must be a string'),

    body('questions.*.explanation')
      .optional()
      .isString()
      .withMessage('explanation must be a string'),

    body('maxScore').optional().isNumeric().withMessage('maxScore must be a number'),
  ];
};
