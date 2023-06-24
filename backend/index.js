const express = require("express");
const { default: mongoose } = require("mongoose");
const configure = require("./configs/configure");

let app = express();
app = configure(app);

const dbURI = process.env.DB_URI || "mongodb://127.0.0.1:27017/ekomerz";
const port = process.env.PORT || 3300;

mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(port, function () {
      console.log("Server is up and running at http://localhost:" + port);
    })
  )
  .catch((err) => console.log(err));
