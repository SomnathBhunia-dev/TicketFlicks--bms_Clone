const Razorpay = require("razorpay");
require('dotenv').config();

exports.handler = async (event, context) => {
    const { Sub_Total } = JSON.parse(event.body);

    try {
        const instance = new Razorpay({
            key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
            key_secret: process.env.REACT_APP_RAZORPAY_SECRET,
        });

        const options = {
            amount: Sub_Total,
            currency: "INR",
            receipt: "receipt#1",
        };

        const order = await instance.orders.create(options);

        if (!order) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Some error occurred" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                id: order.id,
                currency: order.currency,
                amount: order.amount
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
