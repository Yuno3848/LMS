import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLogged.middleware.js';
import { validateCart, validateRemoveCart } from '../validators/cart.validator.js';
import { addToCart, removeFromCart, showCart } from '../controllers/cart.controller.js';

const cart = Router();

cart.post('/add-to-cart/:courseId', isLogged, validateCart(), validatorError, addToCart);

cart.delete('/remove-from-cart', isLogged, validateRemoveCart(), validatorError, removeFromCart);

cart.get('/show-cart', isLogged, showCart);

export default cart;
