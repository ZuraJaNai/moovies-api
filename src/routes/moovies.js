const express = require('express');
const router = express.Router();
const Moovie = require('../models/moovie');


// @route GET /moovies
// @desc Get list of moovies sorted alphabetically
router.get('/', (req, res) => {
    Moovie.find({}).sort({ title: 1 })
        .then(results => {
            req.body.response = results;
            res.status(200).json(results);
        })
        .catch(err => res.status(500).json(err));
});

// @route GET /moovies/id
// @desc Get moovie by id
router.get('/:id', (req, res) => {
    Moovie.findById(req.params.id)
        .then(results => {
            req.body.response = results;
            res.status(200).json(results);
        })
        .catch(err => res.status(500).json(err));
});

// @route POST /moovies
// @desc Create new moovie
router.post('/', (req, res) => {
    Moovie.create({
        title: req.body.title,
        year: req.body.year,
        format: req.body.format,
        actors: req.body.actors,
    })
        .then(results =>
            res.status(201).json(results)
        )
        .catch(err => res.status(500).json(err));
});

// @route delete /moovies/:id
// @desc Delete moovie by id
router.delete('/:id', (req, res) => {
    Moovie.findByIdAndRemove(req.params.id)
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;