const mongoose = require('mongoose');

const moovieSchema = new mongoose.Schema({
    title: String,
    year: String,
    format: String,
    actors: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }
    ]
});

const Moovie = mongoose.model('Moovie', moovieSchema);
module.exports = Moovie;