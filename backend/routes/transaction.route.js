import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLogged.middleware.js';
import {
  validateCreateOrder,
  validateTransaction,
  validateVerifyPayment,
} from '../validators/transaction.validator.js';
import {
  cancelTransaction,
  createOrder,
  getAllTransaction,
  getTransactionById,
  verifyPayment,
} from '../controllers/transaction.controller.js';

const transaction = Router();
transaction.post(
  '/create-order/:courseId',
  validateCreateOrder(),
  validatorError,
  isLogged,
  createOrder,
);

transaction.post(
  '/verify-payment',
  validateVerifyPayment(),
  validatorError,
  isLogged,
  verifyPayment,
);

transaction.post(
  '/cancel-transaction/:transactionId',
  validateTransaction(),
  validatorError,
  isLogged,
  cancelTransaction,
);

transaction.get(
  '/get-transaction-by-id/:transactionId',
  validateTransaction(),
  validatorError,
  isLogged,
  getTransactionById,
);
transaction.get('/get-all-transaction', isLogged, getAllTransaction);

export default transaction;
