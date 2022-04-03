const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const { Rental, validateRental } = require("../models/Rental");
const { Movie } = require("../models/Movie");
const { Customer } = require("../models/Customer");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rentals.find().sort("-dateOut");
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
  if(!movie) return res.status(400).send("Invalid request for movie")
});

router("/:id", async (req, res) => {
  const rental = await Rentals.findById(req.params.id);
  res.send(rental);
});