// const connectToMongoDB = require('./mongo');


// exports.handler = async (event, context) => {
//   try {
//     const db = await connectToMongoDB();

//     const collection = db.collection('bookings');

//     // Parse the request body

//     // Insert the data into the collection
//     const result = await collection.insertOne(data);

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: 'Data saved successfully', insertedId: result.insertedId }),
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: 'Internal Server Error' }),
//     };
//   }
// };
const axios = require('axios');

exports.handler = async (event, context) => {
  const entry = JSON.parse(event.body);

  try {
    const data = JSON.stringify({
      "collection": "bookings",
      "database": "test",
      "dataSource": "TicketFlicks",
      "document": entry
    });

    const config = {
      method: 'post',
      url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-xndqb/endpoint/data/v1/action/insertOne',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.REACT_APP_MONGO_KEY,
      },
      data: data
    };

    const response = await axios(config);
    console.log(JSON.stringify(response.data));

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