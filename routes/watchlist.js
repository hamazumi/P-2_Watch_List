
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

module.exports = router;