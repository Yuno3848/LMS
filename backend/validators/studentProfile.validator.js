import { body } from 'express-validator';

export const validateStudentProfile = () => {
  return [
    body('bio').optional().isString().withMessage('Bio must be a string'),
    body('skills')
      .optional()
      .isArray()
      .withMessage('Skills must be an array of strings')
      .bail()
      .custom((skills) => skills.every((skill) => typeof skill === 'string'))
      .withMessage('Each skill must be a string'),
    body('socialLinks').optional().isObject().withMessage('Social links must be an object'),

    body('socialLinks.linkedin').optional().isString().withMessage('LinkedIn must be a string'),
    body('socialLinks.twitter').optional().isString().withMessage('Twitter must be a string'),
    body('socialLinks.facebook').optional().isString().withMessage('Facebook must be a  string'),
    body('socialLinks.instagram').optional().isString().withMessage('Instagram must be a string'),
    body('education').optional().isArray().withMessage('Education must be an array of objects'),
    body('interests')
      .optional()
      .isArray()
      .withMessage('Interests must be an array of strings')
      .bail()
      .custom((interests) => interests.every((interest) => typeof interest === 'string'))
      .withMessage('Each interest must be a string'),
  ];
};
