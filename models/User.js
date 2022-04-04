const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");

const User = new mongoose.model(
  "user",
  new mongoose.Schema({
    name: { type: String, required: true,minlength: 1, maxlength: 55 },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 155,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

function validate(User) {
  const schema = {
    name: Joi.string().required().max(50),
    email: Joi.string().email().required().max(55),
    password: Joi.string().required().min(7).max(255),
  };
  return Joi.validate(User, schema);
}

exports.User = User;
exports.validate = validate;
