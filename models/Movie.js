const mongoose = require('mongoose')

const movieAchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Number,
        required: true
    },
    MovieDescription: {
        type: String,
        required: true
    }
})

const Movie = mongoose.model('Movie', movieAchema)
module.exports = Movie