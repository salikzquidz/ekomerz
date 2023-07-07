const { Router } = require("express");
const Product = require("../models/productModel");
const upload = require("../middlewares/uploadProductImage");
const router = Router();

router.get("/products", async function (req, res) {
  console.log("showing the products for homepage");
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.send("ERROR");
  }
});

router.get("/product/:id", async function (req, res) {
  const { id } = req.params;
  try {
    let product = await Product.findById(id);
    res.send(product);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/product", upload.single("image"), async function (req, res) {
  console.log("posting a product");
  const { name, description, price, countInStock, numReviews } = req.body;

  try {
    const product = await Product.create({
      name,
      description,
      price,
      countInStock,
      numReviews,
      image: req.file.path,
    });
    console.log(res);
    res.status(201).json({ product: product._id });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
