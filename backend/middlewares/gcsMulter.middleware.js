import multer from 'multer';
import { Storage } from '@google-cloud/storage';

// init GCS client
const storage = new Storage({
  projectId: 'analog-reef-468911',
  keyFilename: './utils/gcs-key.json',
});

const bucket = storage.bucket('analog-reef-468911-j1-raw');

// 🔹 single middleware to handle multer + GCS upload
const gcsUploader = (folder = '') => {
  const upload = multer({ storage: multer.memoryStorage() }).single('video');

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) return next(err);
      if (!req.file) return next();

      const gcsFileName = `${folder}${Date.now()}-${req.file.originalname}`;
      const blob = bucket.file(gcsFileName);

      const stream = blob.createWriteStream({
        resumable: false,
        contentType: req.file.mimetype,
        // predefinedAcl: 'publicRead', // ← This makes the file publicly accessible
      });

      stream.on('error', next);

      stream.on('finish', () => {
        // ✅ THIS IS WHERE cloudStorageObject IS ADDED TO req.file
        req.file.cloudStorageObject = gcsFileName;

        // ✅ THIS IS WHERE cloudStoragePublicUrl IS ADDED TO req.file
        req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${gcsFileName}`;
        //                                  ↑ Standard GCS public URL format
        //                                  https://storage.googleapis.com/BUCKET_NAME/FILE_NAME

        next(); // Continue to the next middleware/controller
      });

      stream.end(req.file.buffer);
    });
  };
};

export default gcsUploader;
