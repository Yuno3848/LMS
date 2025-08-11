import { Router } from 'express';

import { isLogged } from '../middlewares/isLoggedd.middleware.js';
import { getUserEnrollments } from '../controllers/enrollment.controller.js';

const enrollment = Router();
enrollment.get('/get-user-enrollment', isLogged, getUserEnrollments);

export default enrollment;
