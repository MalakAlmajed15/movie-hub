// imports
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const morgan = require('morgan')
const methodOverride = require('method-override')
const connectToDB = require('./config/db')
const authRoutes = require('./routes/auth.routes')
const session = require('express-session')
const passUserToView = require('./middleware/passUserToView')
const isSignedIn = require('./middleware/isSignedIn')

//middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))
app.use(passUserToView)
app.set('view engine', 'ejs')

// connecting to database
connectToDB()

app.use('/auth', authRoutes)
app.use(isSignedIn)

// listening to port 3000
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port)
})

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`)
    } else {
        console.error('server error:', err.message)
    }
})