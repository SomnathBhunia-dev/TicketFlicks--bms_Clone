const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    SeatTag: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    SeatBlock: [
      {
        BlockName: {
          type: String,
          required: true,
        },
        AllBlock: [
          {
            SeatBlock: {
              type: String,
              required: true,
            },
            SeatNo: {
              type: Number,
              required: true,
            },
            Reserved: {
              type: Boolean,
              required: true,
            },
          },
        ],
      },
    ],
  });

const SeatChart = mongoose.model('Seat', seatSchema);

module.exports = SeatChart;