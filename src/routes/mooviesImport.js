const express = require('express');
const router = express.Router();
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const multer = require('multer');
const Moovie = require('../models/moovie');
const Actor = require('../models/actor');
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

    lineReader.on('line', line => {
        console.log('Line from file:', line);
    });
    lineReader.on('close', () => fs.unlinkSync(pathToFile))

    res.status(200).end();
});

function importInstances(stream) {

}
module.exports = router;