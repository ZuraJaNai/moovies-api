const mongoose = require('mongoose');

const moovieSchema = new mongoose.Schema({
    'Title': { type: String, required: true },
    'Release Year': String,
    'Format': String,
    'Stars': String
});

const Moovie = mongoose.model('Moovie', moovieSchema);
module.exports = Moovie;