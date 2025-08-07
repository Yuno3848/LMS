import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLoggedd.middleware.js';
import { validateVerifyPayment } from '../validators/transaction.validator.js';
import { createOrder } from '../controllers/transaction.controller.js';

const transaction = Router();
transaction.post('/create-order/:courseId', isLogged, validateVerifyPayment(), validatorError, createOrder);

transaction.get

export default transaction;
