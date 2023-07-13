const { Router } = require("express");
const requireAuth = require("../middlewares/requireAuth");
const Buyer = require("../models/buyerModel");
const router = Router();

router.get("/currentuser", async (req, res) => {
  console.log("in currentuser API route"); // for client to populate the logged in user details
  console.log(req.currentUser);
  if (req.currentUser) {
    const buyer = await Buyer.findOne({ _id: req.currentUser.id });
    console.log(buyer);
    const { _id, products, email } = buyer;
    res.send({ id: _id, cart: products, email });
  } else {
    console.log("guest visit");
    res.send("Guest mode, no problem");
  }
});

module.exports = router;
