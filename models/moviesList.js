const mongoose = require('mongoose');

const movieListSchema = new mongoose.Schema({
  MovieList: Array,
  filters: Array,
});

const MovieList = mongoose.model('MoviesList', movieListSchema);

module.exports = MovieList;