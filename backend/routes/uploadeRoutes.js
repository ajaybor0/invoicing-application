const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    // To accept the file pass `true`, like so:
    cb(null, true);
  } else {
    // To reject this file pass `false`, like so:
    cb('Images only!');
  }
};

const upload = multer({ storage, fileFilter }).single('image');

router.post('/', upload, (req, res) => {
  console.log(req.file.filename);
  if (!req.file) {
    res.statusCode = 400;
    throw new Error('No file uploaded');
  }
  res
    .status(200)
    .json({ message: 'Image uploaded', imageUrl: `/${req.file.filename}` });
});

module.exports = router;
