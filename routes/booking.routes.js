const router = require('express').Router()
const Booking = require('../models/Booking')

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
router.
module.exports = router