const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const app = express();
const config = require("config");
const genresRoutes = require("./routes/genres");
const customersRoutes = require("./routes/customers");
const rentalRoutes = require("./routes/rentals");
const moviesRoutes = require("./routes/movies");
const usersRoutes = require("./routes/users");
const port = process.env.PORT || 5000;

if (!config.get("jwtPrivateKey")) {
  console.error("jwtPrivatekey is not set in config");
  process.exit(1);
}

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
app.use("/api/movies", moviesRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", auth);

app.listen(port, () => {
  console.log(`Connected on ${port}`);
});
