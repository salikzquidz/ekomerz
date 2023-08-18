const { Router } = require("express");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Buyer = require("../models/buyerModel");
const router = Router();

router.post("/order", async (req, res) => {
  const { products, subTotal, tax, total, status } = req.body;
  try {
    if (products.length > 0) {
      // create order
      await Order.create({
        userId: req.currentUser.id,
        products,
        subTotal,
        tax,
        total,
        status,
        date: new Date(),
      });
      // update Product collection in db
      for (let i = 0; i < products.length; i++) {
        await Product.findByIdAndUpdate(products[i]._id, {
          $inc: { countInStock: -products[i].quantity },
        });
      }
      // update User collection in db
      await Buyer.findByIdAndUpdate(req.currentUser.id, { products: [] });
      res.sendStatus(201);
    } else Throw("No products in the order");
  } catch (error) {
    console.log(error);
  }
});

router.get("/order", async (req, res) => {
  try {
    let order = await Order.find({ userId: req.currentUser.id });
    res.send(order);
  } catch (error) {
    console.log(error);
    res.send("No order for this user");
  }
});

module.exports = router;
