const express = require('express');
const router = express.Router();
const Moovie = require('../models/moovie');

// @route POST /search/title
// @desc Find moovies by title
router.post('/title', (req, res) => {
    Moovie.find({ "Title": { "$regex": req.body.value, "$options": "i" } })
        .then(results =>
            res.status(200).json(results)
        )
        .catch(err => res.status(500).json(err));
});

// @route POST /search/actor
// @desc Find moovies by actor
router.post('/star', (req, res) => {
    Moovie.find({ "Stars": { "$regex": req.body.value, "$options": "i" } })
        .then(results =>
            res.status(200).json(results)
        )
        .catch(err => res.status(500).json(err));
});

module.exports = router;