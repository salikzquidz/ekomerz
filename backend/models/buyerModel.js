const mongoose = require("mongoose");
const { isEmail } = require("validator");
const cartSchema = require("./cartSchema");

const buyerSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minLength: [7, "Minimum password length is 7"],
  },
  products: [cartSchema],
});

// query middleware
buyerSchema.pre("updateOne", async function (next) {
  // increment/decrement qty case
  if (this.getUpdate()["$inc"]?.["products.$.quantity"]) {
    const quantityInput = this.getUpdate()["$inc"]["products.$.quantity"];
    // to return only one field from entire array, we can use projection into find , and use $
    const specificProductInsideCart = await this.model.findOne(
      this.getFilter(),
      {
        "products.$": 1,
      }
    );
    if (specificProductInsideCart?.products[0]?.quantity + quantityInput < 0) {
      throw "Not valid input, the item in the cart is not that much";
    }
  }
  next();
});

const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer;
