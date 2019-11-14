const express = require('express');
const router = express.Router();
const Moovie = require('../models/moovie');

// @route POST /search/title
// @desc Find moovies by title
router.post('/title', (req, res) => {
    Moovie.find({ title: { "$regex": req.body.title, "$options": "i" } })
        .then(results =>
            res.status(201).json(results)
        )
        .catch(err => res.status(500).json(err));
});

// @route POST /search/actor
// @desc Find moovies by actor
router.post('/actor', (req, res) => {
    //find actors
    Moovie.find({ actors: [] })
        .then(results =>
            res.status(201).json(results)
        )
        .catch(err => res.status(500).json(err));
});


module.exports = router;