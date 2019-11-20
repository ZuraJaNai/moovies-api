const express = require('express');
const router = express.Router();
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const multer = require('multer');
const Moovie = require('../models/moovie');
require('dotenv').config();
const fileName = 'file';
const dir = `../../${process.env.UPLOADS_DIR}/`;


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, dir));
    },
    filename: function (req, file, cb) {
        cb(null, fileName)
    }
})

var upload = multer({ storage: storage })

// @route POST /import
// @desc import moovies from txt file to mongodb
//       request body should contain txt file
router.post('/', upload.single(fileName), (req, res) => {
    const pathToFile = path.join(__dirname, `${dir}/${fileName}`);
    const lineReader = readline.createInterface({
        input: fs.createReadStream(pathToFile)
    });

    let data = new Object({})
    lineReader.on('line', line => {
        if (!line.trim()) {
            saveInstance(data);
            data = {};
        }
        else {
            const [key, value] = line.split(":")
            data[key] = value.trim();
        }
    });
    lineReader.on('close', () => fs.unlinkSync(pathToFile))

    res.status(200).end();
});

function saveInstance(data) {
    Moovie.create({ ...data })
        .catch(err => console.log(err));
}
module.exports = router;