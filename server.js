const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const fileRoute = require("./routes/file_route");

const app = express();
dotenv.config();

app.use(express.static(path.join(__dirname, "public")));

app.use("/", fileRoute);

const port = process.env.port || 3000;
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("✅ Mongo db successfully connected");

    app.listen(port, () => {
      console.log(`✅ Server start at: ${port}`);
    });
  } catch (e) {
    console.error("❌ Server error:", e.message);
  }
})();
