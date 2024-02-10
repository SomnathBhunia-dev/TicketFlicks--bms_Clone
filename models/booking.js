const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  BookingDate: String,
  BookingTime: String,
  MovieName: String,
  Amount: {type: Number, required: true},
  Resolution: String,
  Language: String,
  SeatDetails: Array,
  movieData: Object,
  Profile: Object
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;