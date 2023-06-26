const { mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  numReviews: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// make sure no lowercase letter in front
productSchema.pre("save", function (next) {
  this.name.charAt(0).toUpperCase();
  next();
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
