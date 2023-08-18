const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const productRoutes = require("../routes/productRoutes");
const cartRoutes = require("../routes/cartRoutes");
const authRoutes = require("../routes/authRoutes");
const checkoutRoutes = require("../routes/checkoutRoutes");
const currentUserRoute = require("../routes/currentUserRoute");
const orderRoute = require("../routes/orderRoutes");
const currentUser = require("../middlewares/currentUser");
require("dotenv").config();

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(function (req, res, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.use(
    "/api/v1/",
    currentUser,
    productRoutes,
    cartRoutes,
    authRoutes,
    checkoutRoutes,
    orderRoute,
    currentUserRoute
  );
  app.use("/images/product/", express.static("images/product")); // localhost:3300/images/product/....png
  return app;
};
