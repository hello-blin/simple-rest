const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const { Customer, validateCustomer } = require("../models/Customer");
const auth = require("../middleware/auth")

router.get("/", async (req, res) => {
  let customers = await Customer.find();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  res.send(customer);
});

router.post("/",auth, async (req, res) => {
  const { error } = Joi.validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone,
      },
    },
    { new: true }
  );
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let customer = await Customer.findByIdAndRemove(req.params.id);
  res.send(customer);
});

module.exports = router;
