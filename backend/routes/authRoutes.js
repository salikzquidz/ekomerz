const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Buyer = require("../models/buyerModel");
const router = Router();

// jwt
const jwtTokenAge = 60 * 60 * 12; // seconds (12 hours)
const generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: jwtTokenAge });
};

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await Buyer.create({ email, password: hashedPassword });
    res.status(201).send("created");
  } catch (error) {
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const buyer = await Buyer.findOne({ email });
    const isPasswordMatch = await bcrypt.compare(password, buyer.password); // boolean
    if (isPasswordMatch) {
      const token = generateJwtToken(buyer._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: jwtTokenAge * 1000 }); // maxAge is in ms
      res.json({ buyer_id: buyer._id });
    } else {
      res.send("Invalid email or password");
    }
  } catch (error) {
    res.send(error);
  }
});

// todo
// handle error of non unique email

module.exports = router;
