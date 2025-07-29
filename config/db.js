const mongoose = require('mongoose')

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected To Database')
    } catch (error) {
        console.log('Error Occures', error)
    }
}

module.exports = connectToDB