const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const mooviesImport = require('./src/routes/mooviesImport');
const moovies = require('./src/routes/moovies');
const search = require('./src/routes/search');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);
app.use(bodyParser.json());


// Connect to MongoDB
mongoose
    .set('useNewUrlParser', true)
    .set('useFindAndModify', false)
    .set('useCreateIndex', true)
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));

//create directory for file import
const dir = `./${process.env.UPLOADS_DIR}`;
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Routes
app.use('/import', mooviesImport);
app.use('/moovies', moovies);
app.use('/search', search);

app.listen(port, () => console.log(`Server up and running on port ${port} !`));