const { Router } = require("express");
const Buyer = require("../models/buyerModel");
const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    await Buyer.create({ email, password });
    res.send("created");
  } catch (error) {
    res.send(error);
  }
});

// todo
// hash password
// handle error of non unique email

module.exports = router;
