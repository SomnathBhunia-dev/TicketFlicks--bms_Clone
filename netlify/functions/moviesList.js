const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const data = JSON.stringify({
      "collection": "movieslists",
      "database": "test",
      "dataSource": "TicketFlicks",
      "projection": {
        "_id": 1,
        "MovieList": 1,
        "filters": 1
      }
    });

    const config = {
      method: 'post',
      url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-xndqb/endpoint/data/v1/action/findOne',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.REACT_APP_MONGO_KEY,
      },
      data: data
    };

    const response = await axios(config);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.document),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
