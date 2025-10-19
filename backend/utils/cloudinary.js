import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (fileBuffer, originalname) => {
  try {
    const ext = path.extname(originalname).toLowerCase(); // e.g. '.jpg', '.pdf'

    let resourceType = 'image';
    if (ext === '.pdf') {
      resourceType = 'raw';
    }

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: resourceType },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  } catch (error) {
    console.error('Error while uploading file:', error);
    return null;
  }
};
