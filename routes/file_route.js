const express = require('express');
const { fileUpload, downloadFile } = require('../controller/file_controller');
const fileRoute = express.Router();

fileRoute.post('/upload', fileUpload);
fileRoute.get('/dl/:id', downloadFile)

module.exports = fileRoute;