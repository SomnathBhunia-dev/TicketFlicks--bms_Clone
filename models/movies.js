const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
  Description: Object,
  bannerWidget: Object
});

const Movie = mongoose.model('Movies', moviesSchema);

module.exports = Movie;