const multer = require("multer");
const path = require("path");
const shortUniqueId = require("short-unique-id");
const FileData = require("../model/file_model");

const uid = new shortUniqueId({ length: 10 });

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "-";
    cb(null, uniqueSuffix + file.fieldname + path.extname(file.originalname));
  },
});

const upload = multer({
  limits: { fileSize: 100000000 },
  storage: storage,
}).single("file");

exports.fileUpload = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        res.json({ message: `Upload error: ${err}` });
      } else {
        const fileId = uid.rnd();
        const fileData = new FileData({fileId: fileId, fileName: 'test-name.png'});
        await fileData.save();

        res
          .status(201)
          .json({ fileId: fileId, success: "file upload successful" });
      }
    });
  } catch (e) {
    res.status(500).json({ message: `fileUpload error: ${e}` });
  }
};

exports.downloadFile = async (req, res) => {
  const fileId = req.params.id;
};
