const express = require("express");
const mongoose = require("mongoose");
const { User } = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");

router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validpass = await bcrypt.compare(req.body.password, user.password);
  if (!validpass) return res.status(400).send("Invalid email or password");

  res.send(true);
});

router.get("/", async (req, res) => {
  let users = await User.find().sort("name").select("name email");
  res.send(users);
});

function validate(req) {
  const schema = {
    email: Joi.string().email().required().max(55),
    password: Joi.string().required().min(7).max(255),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
