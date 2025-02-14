const cron = require("node-cron");
const path = require("path");
const fs = require("fs");
const FileData = require("./../model/file_model");

async function deleteFiles() {
  try {
    const uploadDir = path.join(__dirname, "../uploads");
    const fileToDelete = await FileData.find({
        createdAt: { $lt: new Date(Date.now() - 1 * 60 * 60 * 1000) },
    });

    if (fileToDelete.length === 0) {
      console.log("No expired files to delete.");
      return;
    }

    fileToDelete.forEach(async (file) => {
      const filePath = path.join(uploadDir, file.fileName);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error deleting file: " + err);
        } else {
          console.log(`Deleted file: ${file.fileName}`);
        }
      });

      await FileData.deleteOne({ _id: file._id });
      console.log(`Deleted file record from DB: ${file.fileName}`);
    });
  } catch (e) {
    console.error("Error during cleanup:", e);
  }
}

cron.schedule("* * * * * *", () => {
    console.log('Running cleanup job...');
  deleteFiles();
});
