const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    }
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie