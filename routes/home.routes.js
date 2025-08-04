const router = require("express").Router()

router.get('/home', (req, res) => {
    res.render('home')
})

router.post('/home', async (req, res) => {
    try {
        res.redirect('/views/home.ejs')
    } catch (error) {
        console.error(error)
    }   
})

module.exports = router