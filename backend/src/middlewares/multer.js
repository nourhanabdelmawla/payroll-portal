
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/salaries/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

exports.upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".zip" && ext !== ".pdf") {
      return cb(new Error("Only ZIP or PDF allowed"));
    }
    cb(null, true);
  }
});


