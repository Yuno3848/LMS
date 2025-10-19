import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLogged.middleware.js';
import {
  validateCreateSubItemSection,
  validateDeleteSubItemSection,
} from '../validators/subItem.validator.js';
import {
  createSubItemSection,
  deleteSubItemSection,
} from '../controllers/subItemSection.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const subItem = Router();

subItem.post(
  '/create-subItemSection/:itemSectionId',
  isLogged,
  upload.single('file'),
  validateCreateSubItemSection(),
  validatorError,
  createSubItemSection,
);

subItem.delete(
  '/delete-subItemSection/:subItemId',
  validateDeleteSubItemSection(),
  validatorError,
  isLogged,
  deleteSubItemSection,
);

export default subItem;
