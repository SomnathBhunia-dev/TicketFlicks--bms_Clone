const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 6000;

// Use cors middleware
app.use(cors());
// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.REACT_APP_MONGO_ID, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the Movie Ticket Booking API!');
});

app.use("/payment", require("./routes/payments"));

// Define routes

app.use('/api/private', require('./routes/privateRoutes'));
app.use('/api/public', require('./routes/publicRoutes'));


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
