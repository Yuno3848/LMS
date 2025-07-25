import { body } from 'express-validator';
import mongoose from 'mongoose';
export const validateInstructorProfile = () => {
  return [
    body('bio')
      .optional()
      .isLength({ max: 500 })
      .withMessage("bio can't be more than 500 characters"),

    body('expertise')
      .optional()
      .isArray()
      .withMessage('experise must be an array of strings')
      .bail()
      .custom((expertises) => expertises.every((expertise) => typeof expertise === 'string'))
      .withMessage('Each expertise must be an string'),

    body('socialLinks').optional().isObject().withMessage('Social links must be an object'),

    body('socialLinks.linkedin')
      .optional()
      .isURL()
      .isString()
      .withMessage('Linkedin must be a string'),

    body('socialLinks.twitter')
      .optional()
      .isURL()
      .isString()
      .withMessage('twitter must be a string'),
    body('socialLinks.facebook')
      .optional()
      .isURL()
      .isString()
      .withMessage('facebook must be a string'),
    body('socialLinks.instagram')
      .optional()
      .isURL()
      .isString()
      .withMessage('instagram must be a string'),

    body('rating')
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage('rating must be number between 0 & 5'),

    body('isVerfiedInstructor')
      .optional()
      .isBoolean()
      .withMessage('isVerifiedInstructor must be a boolean'),

    body('courses')
      .optional()
      .isArray()
      .withMessage('Courses must be an array of course IDs')
      .bail()
      .custom((courses) => courses.every((id) => mongoose.Types.ObjectId.isValid(id)))
      .withMessage('Each course must be an valid mongo objectId'),
  ];
};
