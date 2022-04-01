const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: Boolean,
    name: { type: String, minLength: 5, maxLength: 55 },
    phone: { type: Number, min: 9, max: 17 },
  })
);

router.get("/", async (req, res) => {
  let customers = await Customer.find();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  res.send(customer);
});

router.post("/", async (req, res) => {
  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
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
  let customer = await Customer.findByIdAndRemove(req.params.id);
  res.send(customer);
});

module.exports = router;
