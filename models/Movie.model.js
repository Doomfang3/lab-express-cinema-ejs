//Require Mongoose
const mongoose = require('mongoose')

//Create my Schema
const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    stars: [String],
    image: String,
    description: String,
    showtimes: [String],
})

//Create my Model
const Movie = mongoose.model('Movie', movieSchema)

//Export my Model
module.exports = Movie