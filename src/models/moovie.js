const mongoose = require('mongoose');

let moovieSchema = new mongoose.Schema({
    'Title': { type: String, required: true },
    'Release Year': String,
    'Format': String,
    'Stars': String
});
moovieSchema.index({ 'Title': 1, 'Release Year': 1, 'Format': 1 }, { unique: true, dropDups: true });


const Moovie = mongoose.model('Moovie', moovieSchema);
module.exports = Moovie;