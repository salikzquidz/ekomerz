const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const productRoutes = require("../routes/productRoutes");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());
  app.use("/images/product/", express.static("images/product")); // localhost:3300/images/product/....png
  app.use("/api/v1/", productRoutes);
  return app;
};
