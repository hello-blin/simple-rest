const express = require("express");
const app = express();
const genresRoutes = require('./routes/genres')
const Joi = require("joi");
const port = process.env.PORT || 5000;

app.use(express.json());


app.use('/api/genres', genresRoutes);


app.listen(port, () => {
  console.log(`Connected on ${port}`);
});
