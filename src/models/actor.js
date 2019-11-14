const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
});

const Actor = mongoose.model('Actor', actorSchema);
module.exports = Actor;