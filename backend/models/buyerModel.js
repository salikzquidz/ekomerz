const mongoose = require("mongoose");
const { isEmail } = require("validator");

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
});

const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer;
