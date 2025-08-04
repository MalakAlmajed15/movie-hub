const router = require('express').Router()
const Booking = require('../models/Booking')
const Movie = require('../models/Movie')
const dateArrayO = ['10-08-2025', '11-08-2025', '12-08-2025', '13-08-2025', '14-08-2025', '15-08-2025', '16-08-2025', '17-08-2025']
const timeArrayO = ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM']
const randomD = Math.floor(Math.random() * dateArrayO.length)
        for(let i = 0 ; i < 5 ; i++){
            const randomDate= dateArrayO[randomD]
            dateArrayO.splice(randomDate, 1)
            console.log(dateArrayO)
        }
        const randomT = Math.floor(Math.random() * timeArrayO.length)
        for(let i = 0 ; i < 5 ; i++){
            const randomTime= timeArrayO[randomT]
            timeArrayO.splice(randomTime, 1)
            console.log(timeArrayO)
        }

// adding new booking
router.get('/newBooking/:id', async (req,res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        
        
        res.render('bookings/newBooking', {movie , dateArrayO, timeArrayO})
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

     const foundBooking = await Booking.findById(req.params.id).populate('movie');

  res.render('bookings/editBooking', {
  foundBooking,
  dateArrayO,
  timeArrayO
});

})


router.put('/editBooking/:movieId', async (req, res) => {
  try {
    const { date, time } = req.body;
    const movieId = req.params.movieId;
    const userId = req.session.user._id;

    // Find the booking by movie and user
    const booking = await Booking.findOne({ movie: movieId, user: userId });

    if (!booking) {
      return res.status(404).send('Booking not found.');
    }

    booking.date = date;
    booking.time = time;
    await booking.save();

    res.redirect('/auth/profile'); // or wherever you show bookings
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).send('Server error.');
  }
});


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