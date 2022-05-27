
// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config')

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')
const Movie = require('./models/Movie.models')


const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app)

// default value for title local
const projectName = 'lab-express-cinema'
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase()

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`

// 👇 Start handling routes here
const index = require('./routes/index')
app.use('/', index)

app.get("/movies", async (req, res, next) => {
    const movies = await Movie.find({}) 
    console.log('Movies: ', movies)
    res.render("movies", {movies})
    // .catch(error => console.log(error))
    });

app.get("/movies/:_id", async (req, res, next) => {
    const {_id} = req.params
    const singleMovie = await Movie.findById({_id})
    console.log("Single Movie:", singleMovie)
    res.render('details', {singleMovie})
})

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
