import multer from 'multer';
const multerPath = (localPath) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, localPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  });
  const upload = multer({ storage: storage });
  return upload;
};

export default multerPath;
