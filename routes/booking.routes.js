const router = require('express').Router()
const Booking = require('../models/Booking')
const Movie = require('../models/Movie')

// adding new booking
router.get('/newBooking/:id', async (req,res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        res.render('bookings/newBooking', {movie})
    } catch (error) {
        console.error(error)
        res.redirect('/home')
    }
})

router.post('/newBooking/:id', async (req, res) => {
    try {
        req.body.user = req.session.user._id
        req.body.movie = req.params.id
        const newBooking = await Booking.create(req.body)
        res.redirect('/profile')
    } catch (error) {
        console.error(error)
        res.redirect('/home')
    }
})

// all bookings
router.get('/allBookings', async (req, res) => {
    try {
        const allBookings = await Booking.find({ user: req.session.user._id }).populate('movie')
        res.render('bookings/allBookings.ejs', {allBookings})
    } catch (error) {
       console.error(error)
       res.redirect('/home') 
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
        req.body.booking = req.session.movie._id
        req.body.movie = req.params.id
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/bookings/bookingDetails')
    } catch (error) {
        console.log(error)
    }
}) // adding the movie and the booking

// deleting the booking
router.get('/delete/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id)
        res.redirect('/profile')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router