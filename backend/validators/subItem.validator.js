import { body, param } from 'express-validator';

export const validateCreateSubItemSection = () => {
  return [
    // param('sectionId')
    //   .notEmpty()
    //   .withMessage('Section ID is required')
    //   .isMongoId()
    //   .withMessage('Invalid section ID format'),

    body('itemType')
      .notEmpty()
      .withMessage('itemType is required')
      .isIn(['video', 'quiz', 'text', 'assignment'])
      .withMessage('itemType must be video, quiz, text, or assignment'),

    body('title')
      .notEmpty()
      .withMessage('title is required')
      .isString()
      .withMessage('title must be a string')
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('title must be between 1 and 200 characters'),

    body('content').optional().isString().withMessage('content must be a string'),

    body('duration').optional().isNumeric().withMessage('duration must be a number'),

    // FIXED: contentUrl can be string or object, validated in controller
    body('contentUrl')
      .optional()
      .custom((value, { req }) => {
        // For video type, ensure contentUrl is provided
        if (req.body.itemType === 'video') {
          if (!value) {
            throw new Error('contentUrl is required for video items');
          }

          // Can be a string URL or an object with url property
          if (typeof value === 'string') {
            return true;
          }

          if (typeof value === 'object' && value.url) {
            return true;
          }

          throw new Error('contentUrl must be a valid URL string or object with url property');
        }

        return true;
      }),

    body('orderIndex').optional().isNumeric().withMessage('orderIndex must be a number'),
  ];
};

export const validateDeleteSubItemSection = () => {
  return [
    param('subItemId')
      .notEmpty()
      .withMessage("subItem ID can't be empty")
      .isMongoId()
      .withMessage('subItem ID must be a valid MongoDB ObjectId'),
  ];
};

export const validateUpdateSubItemSection = () => {
  return [
    param('subItemId')
      .notEmpty()
      .withMessage("subItem ID can't be empty")
      .isMongoId()
      .withMessage('subItem ID must be a valid MongoDB ObjectId'),

    body('itemType')
      .optional()
      .isIn(['video', 'quiz', 'text', 'assignment'])
      .withMessage('itemType must be video, quiz, text, or assignment'),

    body('title')
      .optional()
      .isString()
      .withMessage('title must be a string')
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('title must be between 1 and 200 characters'),

    body('content').optional().isString().withMessage('content must be a string'),

    body('duration').optional().isNumeric().withMessage('duration must be a number'),

    body('contentUrl')
      .optional()
      .custom((value) => {
        // Can be a string URL or an object with url property
        if (typeof value === 'string') {
          return true;
        }

        if (typeof value === 'object' && value.url) {
          return true;
        }

        throw new Error('contentUrl must be a valid URL string or object with url property');
      }),

    body('orderIndex').optional().isNumeric().withMessage('orderIndex must be a number'),
  ];
};
