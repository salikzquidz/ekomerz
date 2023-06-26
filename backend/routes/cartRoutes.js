const { Router } = require("express");
const Cart = require("../models/cartModel");
const router = Router();

router.post("/cart", async (req, res) => {
  const { userId, products } = req.body;
  console.log(userId);
  try {
    // add something to cart
    const cart2 = await Cart.updateOne(
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

    // if the product id not exist in this user's cart, push this product into this user cart
    if (!cart2.matchedCount) {
      await Cart.updateOne(
        {
          _id: userId,
        },
        {
          $push: {
            products: products,
          },
        }
      );
      res.send("new item inserted into cart");
    } else {
      res.send("cart updated, increased!");
    }
  } catch (error) {
    res.send(error);
  }
});

// to do
// update cart of same user
// check

module.exports = router;
