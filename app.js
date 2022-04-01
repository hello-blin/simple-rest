const express = require("express");
const mongoose = require("mongoose");
const app = express();
const genresRoutes = require("./routes/genres");
const Joi = require("joi");
const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => {
    console.log("Connected successfully to database: Vidly");
  })
  .catch((err) =>
    console.log("Something went wrong, check configuration, ERROR=>", err)
  );

  

app.use(express.json());

app.use("/api/genres", genresRoutes);

app.listen(port, () => {
  console.log(`Connected on ${port}`);
});
