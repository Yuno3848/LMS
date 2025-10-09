import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLogged.middleware.js';
import {
  validateCreateItemSection,
  validateGetAllItemSection,
  validateItemSection,
  validateUpdateItemSection,
} from '../validators/itemSection.validator.js';
import {
  createItemSection,
  deleteItemSection,
  getAllItemSection,
  getItemSectionById,
  updateItemSection,
} from '../controllers/itemSection.controller.js';

const itemSection = Router();

itemSection.post(
  '/create-item-section/:courseId',
  validateCreateItemSection(),
  validatorError,
  isLogged,
  createItemSection,
);

itemSection.patch(
  '/update-item-section/:courseId',
  validateUpdateItemSection(),
  validatorError,
  isLogged,
  updateItemSection,
);

itemSection.delete(
  '/delete-item-section/:courseId',
  validateItemSection(),
  validatorError,
  isLogged,
  deleteItemSection,
);
itemSection.get(
  '/get-item-section-by-id/:courseId',
  validateItemSection(),
  validatorError,
  isLogged,
  getItemSectionById,
);

itemSection.get(
  '/get-all-item-section/:courseId',
  validateGetAllItemSection(),
  validatorError,
  isLogged,
  getAllItemSection,
);
export default itemSection;
