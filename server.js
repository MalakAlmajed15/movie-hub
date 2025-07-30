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
const bcrypt = require('bcrypt')
const homeRoures = require('./routes/home.routes')

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
app.set('views', __dirname + '/views')

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});


// connecting to database
connectToDB()
app.use('/',homeRoures)
app.use('/auth', authRoutes)

app.get('/home', (req,res) => {
  res.render('home.ejs')
})

app.use(isSignedIn)

// listening to port 3000
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log('Listening on port ' + port)
})

server.on("error", (err) => { 
  if (err.code === "EADDRINUSE") {
    console.error(` Port ${port} is already in use.`);
  } else {
    console.error(" Server error:", err.message);
  }
})