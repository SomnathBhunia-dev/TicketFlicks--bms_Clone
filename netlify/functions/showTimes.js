const axios = require('axios');

exports.handler = async (event, context) => {

  try {
    const data = JSON.stringify({
      "collection": "seats",
      "database": "test",
      "dataSource": "TicketFlicks",
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
