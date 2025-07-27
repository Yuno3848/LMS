import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLoggedd.middleware.js';

import {
  deleteInstructorProfile,
  showPendingInstructorRole,
  verifyInstructorById,
} from '../controllers/admin.controller.js';
import { validateInstructorId } from '../validators/admin.validator.js';

const admin = Router();
admin.get('/show-pending-instructor-request', isLogged, showPendingInstructorRole);

admin.patch(
  '/verify-instructor-by-id/:instructorId',
  validateInstructorId(),
  validatorError,
  isLogged,
  verifyInstructorById,
);

admin.delete(
  '/delete-instructor-profile/:instructorId',
  validateInstructorId(),
  validatorError,
  isLogged,
  deleteInstructorProfile,
);
export default admin;
