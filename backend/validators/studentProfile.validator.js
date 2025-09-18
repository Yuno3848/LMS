import { body } from 'express-validator';

export const validateStudentProfile = () => {
  return [
    body('bio')
      .optional()
      .isLength({ max: 500 })
      .withMessage("bio can't be more than 500 characters")
      .isString()
      .withMessage('Bio must be a string'),
    body('skills')
      .optional()
      .bail()
      .custom((value) => {
        if (typeof value === 'string') {
          return true;
        }
        if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
          return true;
        }
      })
      .withMessage('Each skill must be a string'),

    body('socialLinks').optional().isObject().withMessage('Social links must be an object'),

    body('socialLinks.linkedin')
      .optional()
      .isURL()
      .isString()
      .withMessage('LinkedIn must be a string'),
    body('socialLinks.twitter')
      .optional()
      .isURL()
      .isString()
      .withMessage('Twitter must be a string'),
    body('socialLinks.facebook')
      .optional()
      .isURL()
      .isString()
      .withMessage('Facebook must be a  string'),
    body('socialLinks.instagram')
      .optional()
      .isURL()
      .isString()
      .withMessage('Instagram must be a string'),
    body('education')
      .notEmpty()
      .withMessage('education field required')
      .bail()
      .custom((value) => {
        if (typeof value === 'string') return true;
        if (Array.isArray(value) && education.every((education) => typeof education === 'string')) {
          return true;
        }
      })
      .isLength({ max: 500 })
      .withMessage("bio can't be more than 500 characters"),
    body('interests')
      .optional()
      .bail()
      .custom((value) => {
        if (typeof value === 'string') return true;
        if (Array.isArray(value) && interests.every((interest) => typeof interest === 'string')) {
          return true;
        }
      }),
  ];
};
