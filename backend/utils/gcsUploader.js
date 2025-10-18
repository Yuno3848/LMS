// gcsUploader.js
import { Storage } from '@google-cloud/storage';

// Init GCS client
const storage = new Storage({
  keyFilename: process.env.GCP_KEY_FILE, // Use env variable
});

const bucketName = process.env.GCS_BUCKET_NAME; // Use env variable
const bucket = storage.bucket(bucketName);

export const uploadToGCS = (file, folder = '') => {
  return new Promise((resolve, reject) => {
    // Fix: handle empty folder to avoid leading slash
    const fileName = folder
      ? `${folder}/${Date.now()}_${file.originalname}`
      : `${Date.now()}_${file.originalname}`;

    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    blobStream.on('error', (err) => reject(err));

    blobStream.on('finish', async () => {
      try {
        // Make file public (optional - depends on your use case)
        await blob.makePublic();

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      } catch (error) {
        reject(error);
      }
    });

    blobStream.end(file.buffer);
  });
};
