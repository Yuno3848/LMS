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
  '/create-item-section/:courseSectionId',
  validateCreateItemSection(),
  validatorError,
  isLogged,
  createItemSection,
);

itemSection.patch(
  '/update-item-section/:itemSectionId',
  validateUpdateItemSection(),
  validatorError,
  isLogged,
  updateItemSection,
);

itemSection.delete(
  '/delete-item-section/:itemSectionId',
  validateItemSection(),
  validatorError,
  isLogged,
  deleteItemSection,
);
itemSection.get(
  '/get-item-section-by-id/:itemSectionId',
  validateItemSection(),
  validatorError,
  isLogged,
  getItemSectionById,
);

itemSection.get(
  '/get-all-item-section/:courseSectionId',
  validateGetAllItemSection(),
  validatorError,
  isLogged,
  getAllItemSection,
);
export default itemSection;
