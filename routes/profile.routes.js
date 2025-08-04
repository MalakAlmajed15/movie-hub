const router = require('express').Router()
const Booking = require('../models/Booking')
const User = require('../models/User')

router.get('/', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login'); 
    }
    try {
        const user = await User.findById(req.session.user._id)
        const bookings = await Booking.find({user: user._id}).populate('movie')
        res.render('auth/profile', {user, bookings})
    } catch (error) {
        console.error(error)
        res.redirect('/home')
    }
})

module.exports = router