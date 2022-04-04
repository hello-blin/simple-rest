const express = require("express");
const mongoose = require("mongoose");
const { User, validate } = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Already Registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.get("/", async (req, res) => {
  let users = await User.find().sort("name").select("name email");
  res.send(users);
});
module.exports = router;
