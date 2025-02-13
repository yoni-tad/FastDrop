const express = require('express');
const { fileUpload } = require('../controller/file_controller');
const fileRoute = express.Router();

fileRoute.post('/upload', fileUpload);
fileRoute.get('download/:id', )

module.exports = fileRoute;