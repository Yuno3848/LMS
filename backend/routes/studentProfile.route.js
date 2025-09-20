import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLogged.middleware.js';
import { validateStudentProfile } from '../validators/studentProfile.validator.js';
import {
  createStudentProfile,
  getStudentProfile,
  getStudentProfileById,
  updatedStudentProfile,
  verifyStudentProfile,
} from '../controllers/profile.controller.js';

const studentProfile = Router();

studentProfile.post(
  '/create-student-profile',
  validateStudentProfile(),
  validatorError,
  isLogged,
  createStudentProfile,
);
studentProfile.post(
  '/update-student-profile',
  validateStudentProfile(),
  validatorError,
  isLogged,
  updatedStudentProfile,
);

studentProfile.get('/verify-student-profile', isLogged, verifyStudentProfile);

studentProfile.get('/get-student-profile', isLogged, getStudentProfile);

studentProfile.get('/get-student-profile-byId/:id', isLogged, getStudentProfileById);

export default studentProfile;
