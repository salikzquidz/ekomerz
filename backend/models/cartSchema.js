const { mongoose } = require("mongoose");

const cartSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  quantity: {
    type: Number,
    min: 0,
  },
});

// query middleware on subdocuments will not be fired
// cartSchema.pre("updateOne", function () {
//   console.log("update called");
// });

module.exports = cartSchema;
