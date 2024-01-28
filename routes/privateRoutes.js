const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

router.post('/booking', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBook = await newBooking.save();
    res.json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a specific Booked Seat by DAteTime ID
router.get('/bookings', async (req, res) => {
  try {
    const { bookingDate, chooseTime, movieName, resolution, language } = req.query;

    // Create a query object with conditions based on parameters
    const query = {};
    if (bookingDate) {
      query.BookingDate = bookingDate;
    }
    if (chooseTime) {
      query.BookingTime = chooseTime;
    }
    if (resolution) {
      query.Resolution = resolution;
    }
    if (movieName) {
      query.MovieName = movieName;
    }
    if (language) {
      query.Language = language;
    }

    const bookings = await Booking.find(query).select('SeatDetails');
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add more routes for theaters, showtimes, etc.

module.exports = router;
