const mongoose = require('mongoose')
const {Schema} = mongoose

const bookingSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking