const express = require('express');
const router = express.Router();
const request = require('request');

const apiKey = require('../keys');
// const apiKey = '123456789';
const apiBaseUrl = 'http://api.themoviedb.org/3';
// const apiBaseUrl = 'http://localhost:3030';
const nowPlayingUrl = `${apiBaseUrl}/movie/popular?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';


router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    res.render('index', {
      parsedData: parsedData.results
    })
  });
});

router.get('/movie/:id', (req, res, next) => {
  const movieId = req.params.id;
  const thisMovieURL = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  request.get(thisMovieURL, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    console.log(parsedData);
    res.render('single-movie',{
      parsedData, //no results are needed here
    });
  })
});

module.exports = router;
