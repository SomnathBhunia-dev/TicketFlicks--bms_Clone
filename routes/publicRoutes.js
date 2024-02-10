const express = require('express');
const router = express.Router();
const MovieList = require('../models/moviesList');
const SeatChart = require('../models/seatChart');
const Movie = require('../models/movies');

// Your API routes will go here
router.get('/movies', async (req, res) => {
  try {
    const MoviesList = await MovieList.find();
    res.json(MoviesList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/movies/:keyword', async (req, res) => {
  const keyword = req.params.keyword.toLowerCase();

  try {
    // Search for movies where the title contains the keyword
    const movies = await Movie.find({ 'bannerWidget.heading' : { $regex: keyword, $options: 'i' } });

    if (movies.length === 0) {
      return res.status(404).json({ message: 'No movies found matching the keyword' });
    }

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/showtimes', async (req, res) => {
  try {
    const showtimes = await SeatChart.find();
    res.json(showtimes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
