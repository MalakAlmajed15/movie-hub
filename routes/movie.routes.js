const router = require('express').Router()
const Movie = require('../models/Movie')

// all movies
router.get('/allMovies', async (req, res) => {
    try {
        const allMovies = await Movie.find()
        res.render('movies/allMovies.ejs', {allMovies})
    } catch (error) {
        console.log(error)
    }
})

// movie details
router.get('/movieDetails', async (req, res) => {
    try {
        const foundMovie = await Movie.findById(req.params.id)
        res.render('movies/movieDetails.ejs', {foundMovie})
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  res.render('movies/movieDetails', { movie })
})


module.exports = router