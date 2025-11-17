import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLogged.middleware.js';
import {
  validateCreateOrder,
  validateTransaction,
  validateVerifyPayment,
} from '../validators/transaction.validator.js';
import {
  createOrder,
  getAllTransaction,
  getTransactionById,
  verifyPayment,
} from '../controllers/transaction.controller.js';

const transaction = Router();

console.log('im inside transaction route');
transaction.post('/create-order', isLogged, validateCreateOrder(), validatorError, createOrder);

transaction.post(
  '/verify-payment',
  isLogged,
  validateVerifyPayment(),
  validatorError,
  verifyPayment,
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
