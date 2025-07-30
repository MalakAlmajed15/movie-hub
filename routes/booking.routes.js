const router = require('express').Router()
const Booking = require('../models/Booking')
const Movie = require('../models/Movie')

// all bookings
router.get('/allBookings', async (req, res) => {
    try {
        const allBookings = await Booking.find()
        res.render('bookings/allBookings.ejs', {allBookings})
    } catch (error) {
       console.log(error) 
    }
})

// booking details
router.get('/bookingDetails', async (req, res) => {
    try {
        const foundBooking = await Booking.findById(req.params.id)
        res.render('bookings/bookingDetails.ejs',{foundBooking})
    } catch (error) {
        console.log(error)
    }
})

// edit bookings
router.get('/updateBooking/:id', async (req, res) => {
    try {
        const foundBooking = await Booking.findById(req.params.id)
        res.render('bookings/editBooking.ejs', {foundBooking})
    } catch (error) {
        console.log(error)
    }
})

// updating the booking 
router.post('/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/bookings/bookingDetails')
    } catch (error) {
        console.log(error)
    }
})

// deleting the booking
router.delete('/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id)
        res.redirect('/bookings/allBookings')
    } catch (error) {
        console.log(error)
    }
})

// create a route for adding a new booking
router.get('/newBooking', async (req,res) => {
    try {
        const movie = await Movie.findById(movieId)
        res.render('bookings/newBooking', {movie})
    } catch (error) {
        console.error(error)
        res.redirect('/home')
    }
})

router.post('/', async (req, res) => {
    try {
        const {movieId} = req.body
        await Booking.create({
            user: req.session.user._id,
            movie: movieId
        })
        res.redirect('/home')
    } catch (error) {
        console.error(error)
        res.redirect('/home')
    }
})

module.exports = router