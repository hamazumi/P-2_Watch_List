const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 
require('dotenv').config()
const omdbApiKey = process.env.OMDB_API_KEY

// GET /watchlist - return a page with favorited movies
router.get('/', (req, res) => {
    // TODO: Get all records from the DB and render to view
    db.movie.findAll()
    .then(movies => {
      res.render('watchlist/watchlist.ejs', { movies: movies })
    }) 
    .catch(err => {
      log(err)
    })
  });
  
  // POST /movie - receive the title of a movie and add it to the database
  router.post('/', (req, res) => {
    // TODO: Get form data and add a new record to DB
    db.movie.findOrCreate({
      where: {
        title: req.body.title,
        poster: req.body.poster,
        imdbID: req.body.imdbID
      }
    })
      .then (movie => {
        res.redirect('/watchlist')
      })
      .catch(error => {
        console.log(error)
      })
  });
  
  // GET /:title - return movie details
router.get('/:imdbID', (req, res) => {
    // TODO: Get all records from the DB and render to view
    let newObject = {
        params: {
          i: req.params.imdbID,
          apikey:omdbApiKey
        }
      }
    axios.get('http://www.omdbapi.com/', newObject)
    .then(apiResponse => {
      let details = apiResponse.data
      console.log('details')
      res.render('watchlist/detail.ejs', {details: details})
    })
  });

  module.exports = router;