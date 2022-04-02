const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: Boolean,
    name: { type: String, minLength: 5, maxLength: 55, required: true },
    phone: { type: String, minLength: 5, max: 55, required: true },
  })
);
function validateCustomer(customer) {
  const schema = {
    name: Joi.string.min(5).required(),
    phone: Joi.string.min(5).max(55).required(),
    isGold: Joi.boolean(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
