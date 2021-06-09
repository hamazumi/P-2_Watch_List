//Import Express
const express = require('express')
//Import axios
const axios = require('axios')
//Import AND config dotenv library
require('dotenv').config()
//Access models
const db = require('./models')
//PORT
const PORT = 3000
//Declare the app
const app = express()
//Import ejsLayouts
const ejsLayouts = require('express-ejs-layouts')
//Define API key var retreived from .env file
const omdbApiKey = process.env.OMDB_API_KEY

// Sets EJS as the view engine (Ability to use view folder and names)
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data (Ability to use <form>)
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware (ability to use ejs <%-Body>)
app.use(ejsLayouts);

// Routes

//Create home route
app.get('/', (req,res) => {
  //Use of ejs and ejs layouts below. You can just put index instead of index.ejs
  res.render('index')
})




//open up a port for app to listen
app.listen(PORT, () => {
  console.log(`Working PORT: ${PORT}`)
})
