const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "-";
    cb(null, uniqueSuffix + file.fieldname + path.extname(file.originalname));
  },
});

const upload = multer({
  limits: { fileSize: (100 * (1024 * 1024)) },
  storage: storage,
}).single("file");

module.exports = upload;