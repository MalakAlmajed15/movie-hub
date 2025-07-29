// imports
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const morgan = require('morgan')
const methodOverride = require('method-override')
const connectToDB = require('./config/db')

//middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

// connecting to database
connectToDB()

// listening to port 3000
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port)
})