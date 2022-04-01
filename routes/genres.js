const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi")

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
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  res.send(genre);
});

router.post("/", async (req, res) => {
  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
      },
    },
    { new: true }
  );
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
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findOneAndRemove(req.params.id);
  res.send(genre);
});

module.exports = router;
