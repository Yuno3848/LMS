import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLoggedd.middleware.js';
import { validateStudentProfile } from '../validators/studentProfile.validator.js';
import {
  createStudentProfile,
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
studentProfile.patch(
  '/update-student-profile',
  validateStudentProfile(),
  validatorError,
  isLogged,
  updatedStudentProfile,
);

studentProfile.get('/verifyStudentProfile', isLogged, verifyStudentProfile);

// studentProfile.get('/get-student-profile', isLogged, getStudentProfile);
// export default studentProfile;

// studentProfile.get('/get-student-profile-byId/:id', isLogged, getStudentProfileById);

export default studentProfile;
