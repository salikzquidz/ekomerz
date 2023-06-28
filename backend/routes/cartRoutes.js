const { Router } = require("express");
const Buyer = require("../models/buyerModel");
const router = Router();

router.post("/cart", async (req, res) => {
  const { userId, products } = req.body;

  try {
    const buyer = await Buyer.updateOne(
      {
        _id: userId,
        "products.productId": products.productId,
      },
      {
        $inc: {
          "products.$.quantity": products.quantity,
        },
      }
    );

    // check negative value - dont push new item to cart if negative value provided
    if (!buyer.matchedCount && products.quantity <= 0) {
      throw "Invalid quantity value";
    }

    // if item not exist, push this item into products array
    if (!buyer.matchedCount) {
      await Buyer.updateOne(
        {
          _id: userId,
        },
        {
          $push: {
            products: products,
          },
        }
      );
      res.send("New item added to cart");
    } else {
      // remove zero quantity product -- maybe need to move this to somewhere else
      await Buyer.updateMany(
        {
          _id: userId,
          "products.productId": products.productId,
        },
        {
          $pull: { products: { quantity: { $lt: 1 } } },
        }
      );
      res.send("Selected item updated in the cart");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// to do
// find out how to calculate the sum of subdocuments - cart quantity
// research how to prevent negative value - currently relying on front end

module.exports = router;
