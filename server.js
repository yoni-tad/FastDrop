const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
dotenv.config();

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server listening no port: ${port}`)
})

