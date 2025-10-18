import { Router } from 'express';
import { validatorError } from '../middlewares/validatorError.js';
import { isLogged } from '../middlewares/isLogged.middleware.js';
import {
  validateCreateSubItemSection,
  validateDeleteSubItemSection,
  validateUpdateSubItemSection,
} from '../validators/subItem.validator.js';
import {
  createSubItemSection,
  deleteSubItemSection,
  updateSubItemSection,
} from '../controllers/subItemSection.controller.js';
import { gcsUploader } from '../middlewares/multer.middleware.js';

const subItem = Router();

subItem.post(
  '/create-subItemSection/:itemSectionId',
  gcsUploader.single('assignment'),
  validateCreateSubItemSection(),
  validatorError,
  isLogged,
  createSubItemSection,
);

subItem.delete(
  '/delete-subItemSection/:subItemId',
  validateDeleteSubItemSection(),
  validatorError,
  isLogged,
  deleteSubItemSection,
);

subItem.patch(
  '/update-subItemSection/:subItemId',
  validateUpdateSubItemSection(),
  validatorError,
  isLogged,
  updateSubItemSection,
);

export default subItem;
