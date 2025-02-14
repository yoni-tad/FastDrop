const shortUniqueId = require("short-unique-id");
const FileData = require("../model/file_model");
const upload = require("../middlewares/file_upload");

const uid = new shortUniqueId({ length: 10 });



exports.fileUpload = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        res.json({ message: `Upload error: ${err}` });
      } else {
        const fileId = uid.rnd();
        const fileData = new FileData({
          fileId: fileId,
          fileName: req.file.filename,
        });
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
  try {
    const fileId = req.params.id;

    const file = await FileData.findOne({ fileId: fileId });

    if (!file) {
      res.status(404).json({ message: "File not found" });
    }

    const filePath = `${__dirname}/../uploads/${file.fileName}`; 

    res.download(filePath);
  } catch (e) {
    res.status(500).json({ message: `fileUpload error: ${e}` });
  }
};
