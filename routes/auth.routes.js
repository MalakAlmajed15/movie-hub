const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.get('/sign-up', (req,res) => {
    res.render('auth/sign-up.ejs', {error: true})
})

router.post('/sign-up', async (req, res) => {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            return res.render('auth/sign-up', {error: 'All Fields Are Required'})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.render('auth/sign-up', {error: 'Please enter a valid email address'})
        }
        const existingUser = await User.findOne({username})
        if(existingUser) {
            return res.render('auth/sign-up', {error: 'Username is already taken'})
        }
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = {
            username,
            password: hashedPassword
        }
        await User.create(newUser)
        res.redirect('/auth/login')
    } catch (error) {
        console.log('Sign-up error: ', error)
        res.render('auth/sign-up', {error: 'Something went wrong. Please try again'})
    }
})