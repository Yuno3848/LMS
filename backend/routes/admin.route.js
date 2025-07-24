import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLoggedd.middleware.js';
import { adminRole } from '../middlewares/admin.middleware.js';
import { showPendingInstructorRole } from '../controllers/admin.controller.js';

const admin = Router();
admin.get('/show-pending-instructor-request', isLogged, adminRole, showPendingInstructorRole);

export default admin;
