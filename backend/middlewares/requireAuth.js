function requireAuth(req, res, next) {
  console.log("in requireAuth middleware");
  if (!req.currentUser) {
    console.log(
      "no current user detected, please ask client to redirect to login page"
    );
    let err = new Error("No current user");
    res.status(401).send({ message: "Please login to continue" });
    next(err);
  } else {
    console.log("user exist");
    console.log(req.currentUser);
    next();
  }
}

module.exports = requireAuth;
