const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");
const jwbt = require("jsonwebtoken");
const config = require("config");


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 55 },
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
});

userSchema.methods.generateAuthToken = function () {
  const token = jwbt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = new mongoose.model("user", userSchema);

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
