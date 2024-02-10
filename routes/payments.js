const express = require("express");
const Razorpay = require("razorpay");
require('dotenv').config();

const router = express.Router();
module.exports = router ;

router.post("/orders", async (req, res) => {
    const { Sub_Total } = req.body
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

        if (!order) return res.status(500).send("Some error occured");

        res.status(200).json({
            id: order.id,
            currency: order.currency,
            amount: order.amount
        });
    } catch (error) {
        res.status(500).send(error);
    }
});
