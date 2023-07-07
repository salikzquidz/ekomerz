const jwt = require("jsonwebtoken");

function currentUser(req, res, next) {
  console.log("in currentUser middleware");

  if (!req.cookies.jwt) {
    console.log(
      "no jwt detected, please redirect to login page if user try to checkout"
    );
    req.currentUser = null;
    next();
  } else {
    console.log("jwt got");
    try {
      const payload = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
      console.log(payload);
      req.currentUser = payload;
      next();
    } catch (error) {
      console.log(error);
      req.currentUser = null;
      next();
    }
  }
}

module.exports = currentUser;
