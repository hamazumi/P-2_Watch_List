const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 
require('dotenv').config()
const omdbApiKey = process.env.OMDB_API_KEY

// GET /watchlist - return a page with favorited movies
router.get('/:id', (req, res) => {
  
  console.log(req.params)
    // TODO: Get all records from the DB and render to view
    db.user.findOne({
      where: {
        id: req.params.id
      },
      include: [db.movie]
    })
    .then(foundUser => {
      console.log(foundUser)
      const movies = foundUser.get().movies
      res.render('watchlist/watchlist.ejs', { movies: movies })
    }) 
    .catch(err => {
      console.log(err)
    })
  });
  
 // POST /watchlist - receive the title of a movie and add it to the database
 router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  console.log(req.body, '========>>>>>>>>========' )
  const foundUser = await db.user.findOne({
    where: {
      user: req.body.user
    }
  })
  const movie = await db.movie.findOrCreate({
    where: {
      title: req.body.title,
      poster: req.body.poster,
      imdbID: req.body.imdbID
    }
  })
  await foundUser.addMovie(movie[0])
  const user = await db.user.findOne({
    where: {
      user: req.body.user
    },
    include: [db.movie]
  })
  const userId = user.get().id
  res.redirect(`/watchlist/${userId}`)
});
  



  module.exports = router;