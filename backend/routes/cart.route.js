import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLogged.middleware.js';
import { validateCart } from '../validators/cart.validator.js';
import { addToCart, removeFromCart } from '../controllers/cart.controller.js';

const cart = Router();

cart.post('/add-to-cart/:courseId', isLogged, validateCart(), validatorError, addToCart);

cart.delete(
  '/remove-from-cart/:courseId',
  isLogged,
  validateCart(),
  validatorError,
  removeFromCart,
);
export default cart;
