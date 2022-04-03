const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const { Rental, validateRental } = require("../models/Rental");
const { Movie } = require("../models/Movie");
const { Customer } = require("../models/Customer");
const router = express.Router();

Fawn.init('mongodb://localhost:27017/vidly');

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(400).send("Invalid request for movie");

  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(400).send("Invalid request for movie");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  rental = await rental.save();
  try {
    new fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } }).run();
    res.send(rental);
  } catch (err) {
    res.status(500).send("Something failed");
  }
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  res.send(rental);
});

module.exports = router;
