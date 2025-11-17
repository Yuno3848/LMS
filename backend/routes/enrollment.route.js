import { Router } from 'express';

import { isLogged } from '../middlewares/isLogged.middleware.js';
import {
  getDetailedUserEnrollments,
  getUserEnrollments,
} from '../controllers/enrollment.controller.js';

const enrollment = Router();
enrollment.get('/get-user-enrollment', isLogged, getUserEnrollments);
enrollment.get('/get-detailed-user-enrollment', isLogged, getDetailedUserEnrollments);

export default enrollment;
