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
      .isArray()
      .withMessage('Skills must be an array of strings')
      .bail()
      .custom((skills) => skills.every((skill) => typeof skill === 'string'))
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
      .isLength({ max: 500 })
      .withMessage("bio can't be more than 500 characters"),
    body('interests')
      .optional()
      .isArray()
      .withMessage('Interests must be an array of strings')
      .bail()
      .custom((interests) => interests.every((interest) => typeof interest === 'string'))
      .withMessage('Each interest must be a string'),
  ];
};
