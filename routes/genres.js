const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Genre = new mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxLength: 55 },
  })
);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// router.get("/api/genres/:id", (req, res) => {
//   const genre = ne
// });

router.post("/", async (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  console.log(result);

  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }

  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) res.status(400).send("No genre was found by that id");

  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  console.log(result);

  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }
  genre.name = req.body.name;
  genre.likes = req.body.likes;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) res.status(400).send("No genre was found by that parameter");
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genres);
});

module.exports = router;
