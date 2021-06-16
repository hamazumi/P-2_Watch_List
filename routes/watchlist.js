//IMPORT ALL DEPENDENCIES 
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 
require('dotenv').config()
const omdbApiKey = process.env.OMDB_API_KEY

// GET ROUTE /watchlist/:ID - return My Watchlist from Movie Model
router.get('/:id', (req, res) => {
  // console.log(req.params)
    // TODO: Get all records from the DB and render to view
    db.user.findOne({
      where: {
        id: req.params.id
      },
      include: [db.movie]
    })
    .then(foundUser => {
      // console.log(foundUser)
      const movies = foundUser.get().movies
      res.render('watchlist/watchlist.ejs', { movies: movies, userId:req.params.id })
    }) 
    .catch(err => {
      console.log(err)
    })
  });
  
 // POST ROUTE /watchlist - finds a USER and findOrCreate MOVIE info then POSTS into Movie Model
 router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
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
  
//DELETE ROUTE destroys the ASSOCIATION between single USER and single MOVIE 
router.delete('/:imdbID', async(req, res) => {
  await db.user_list.destroy({
    where: {
      userId: req.body.user,
      movieId: req.body.movieId
    }
  })
  res.redirect(`/watchlist/${req.body.user}`)
})

  module.exports = router;