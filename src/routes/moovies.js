const express = require('express');
const router = express.Router();
const Moovie = require('../models/moovie');


// @route GET /moovies
// @desc Get list of moovies
router.get('/', (req, res) => {
    Moovie.find({})
        .then(result => {
            req.body.response = result;
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json(err));
});

// @route GET /moovies/sorted
// @desc Get list of moovies sorted alphabetically
router.get('/sorted', (req, res) => {
    Moovie.find({}).sort({ title: 1 })
        .then(result => {
            req.body.response = result;
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json(err));
});

// @route GET /moovies/id
// @desc Get moovie by id
router.get('/:id', (req, res) => {
    Moovie.findById(req.params.id)
        .then(result => {
            req.body.response = result;
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json(err));
});

// @route POST /moovies
// @desc Create new moovie
router.post('/', (req, res) => {
    Moovie.create({
        "Title": req.body.title,
        "Release Year": req.body.year,
        "Format": req.body.format,
        "Stars": req.body.stars,
    })
        .then(result =>
            res.status(201).json(result)
        )
        .catch(err => res.status(500).json(err));
});

// @route delete /moovies/:id
// @desc Delete moovie by id
router.delete('/:id', (req, res) => {
    Moovie.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;