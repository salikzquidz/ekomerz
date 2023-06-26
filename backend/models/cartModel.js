const { mongoose } = require("mongoose");

const cartSchema = mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
