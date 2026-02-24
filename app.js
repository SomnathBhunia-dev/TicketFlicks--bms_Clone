const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Use cors middleware
app.use(cors());
// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect(process.env.REACT_APP_MONGO_ID, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

// Middleware to ensure DB connection is active
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the Movie Ticket Booking API!');
});

app.use("/payment", require("./routes/payments"));
app.use('/api/private', require('./routes/privateRoutes'));
app.use('/api/public', require('./routes/publicRoutes'));

module.exports = app;
