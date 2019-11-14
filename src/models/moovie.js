const mongoose = require('mongoose');

const moovieSchema = new mongoose.Schema({
    title: String,
    year: String,
    format: String,
    actors: [String]
});

const Moovie = mongoose.model('Moovie', moovieSchema);
module.exports = Moovie;