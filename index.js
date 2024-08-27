const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/order", async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: "rzp_test_7XMQw1lJ5Iu1y5",
            key_secret: "6dCtZS3Z4r2Uv82PxiOcPhye"
        });

        const options = {
            amount: req.body.amount,
            currency: req.body.currency,
            receipt: req.body.receiptId,
        };

        const order = await razorpay.orders.create(options);
        if (!order) {
            return res.status(500).send("Error occurred");
        }

        res.json(order);
    } catch (error) {
        res.status(500).send({ error });
    }
});

module.exports = app;
