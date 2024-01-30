const axios = require('axios');

exports.handler = async (event, context) => {
  const { bookingDate, chooseTime, movieName, resolution, language } = event.queryStringParameters;

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
  try {
    const data = JSON.stringify({
      "collection": "bookings",
      "database": "test",
      "dataSource": "TicketFlicks",
      "projection": {
        "SeatDetails": 1
      },
      "filter": query
    });

    const config = {
      method: 'post',
      url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-xndqb/endpoint/data/v1/action/find',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.REACT_APP_MONGO_KEY,
      },
      data: data
    };

    const response = await axios(config);

    if (response.data.documents?.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Booking not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.documents),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
