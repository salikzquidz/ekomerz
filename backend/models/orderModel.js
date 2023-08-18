const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      quantity: {
        type: Number,
        min: 0,
      },
      image: {
        type: String,
      },
      price: {
        type: Number,
      },
    },
  ],
  subTotal: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  total: {
    type: Number,
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
