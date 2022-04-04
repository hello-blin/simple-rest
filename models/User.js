const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");

const User = new mongoose.model(
  "user",
  new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  })
);

function validateUser() {
  const schema = {
    name: Joi.string().required().max(50),
    email: Joi.email().required().max(55),
    password: Joi.string().required().min(7).max(55),
  };
  return Joi.validate(User, schema)
}


