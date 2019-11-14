const express = require('express');
const router = express.Router();
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const multer = require('multer');
const Moovie = require('../models/moovie');
const uploads = 'uploads';
const fileName = 'file';


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, `../../${uploads}/`));
    },
    filename: function (req, file, cb) {
        cb(null, fileName)
    }
})

var upload = multer({ storage: storage })

// @route POST /import
// @desc import moovies from txt file to mongodb
//       request body should contain txt file
// @access Private
router.post('/', upload.single(fileName), (req, res) => {
    const pathToFile = path.join(__dirname, `../../${uploads}/${fileName}`);
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
        .then(result => console.log(result['Format']))
        .catch(err => console.log(err));
}
module.exports = router;