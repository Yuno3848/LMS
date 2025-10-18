import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,

    files: 5, // Max number of files per request
  },
});

export const gcsUploader = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});
