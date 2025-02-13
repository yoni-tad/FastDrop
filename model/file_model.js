const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileId: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model('FileData', fileSchema);