// when purchase is invoked, shoul call payment gatewaty API and validate the transaction, if success , deduct the product qty from db and the product qty from the cart

const { Router } = require("express");
const requireAuth = require("../middlewares/requireAuth");
const router = Router();

// price, product, quantity, location, payment details?
// validate the amount from db ?
router.post("/checkout", requireAuth, async (req, res) => {
  console.log("in checkout API route");

  try {
    const { products } = req.body; // checkout details (array of products)
    console.log(products);
    console.log("req currentUser id");
    console.log(req.currentUser.id); // user id
    // generate invoice no?
    // generate order id?
    // payment gateway stuff
    // done paymnet, send success message, receipt details?
    // client need to invoke redirect to where?
    res.send({});
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
