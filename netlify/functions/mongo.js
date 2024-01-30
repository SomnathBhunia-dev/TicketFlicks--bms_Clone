const { MongoClient } = require('mongodb');

async function connectToMongoDB() {
    try {
        const uri = process.env.REACT_APP_MONGO_ID;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(); // Return the database instance
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Propagate the error to the caller
    }
}

module.exports = connectToMongoDB;
