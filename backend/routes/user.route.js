import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const auth = Router();
auth.post('/register', upload, uploadOnCloudinary, registeredUser);
