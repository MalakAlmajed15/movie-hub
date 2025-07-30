const router = require("express").Router()

router.get('/home', (req, res) {
    res.render('home')
})

router.post('/home', async (req, res) => {
    res.redirect('/views/home.ejs')
})