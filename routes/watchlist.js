
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios'); 
require('dotenv').config()
const omdbApiKey = process.env.OMDB_API_KEY

//Create /results route
router.get('/', (req, res) => {
    let newObject = {
      params:{
        s: req.query.search,
        apikey: omdbApiKey
      }
    }
    //ORIGINAL REQUEST for information
    axios.get('http://www.omdbapi.com/', newObject)
    //RESPONSE FROM API (ACCESS to informaiton)
        .then((resFromAPI) => {
            let movies = resFromAPI.data.Search
        
            res.render('watchlist/index.ejs', {movies: movies})
        })
        .catch(err => {console.log(err)})
  })


// // GET /movie - return a page with favorited movie
// router.get('/', (req, res) => {
//     // TODO: Get all records from the DB and render to view
//     db.movie.findAll()
//     .then(movies => {
//       res.render('watchlist/index.ejs', { movies: movies})
//     }) 
//     .catch(err => {
//       log(err)
//     })
//   });

//   // POST /movie - receive the name of a movie and add it to the database
// router.post('/', (req, res) => {
//     // TODO: Get form data and add a new record to DB
//     db.movie.findOrCreate({
//       where: {
//         name: req.body.name
//       }
//     })
//       .then (movie => {
//         res.redirect('/watchlist')
//       })
//       .catch(error => {
//         console.loge(error)
//       })
//   });

module.exports = router;