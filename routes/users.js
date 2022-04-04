const express = require("express");
const mongoose = require("mongoose");
const { User, validate } = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Already Registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();

  res.send(user);
});

router.get("/", async (req, res) => {
  let users = await User.find().sort("name").select("name email");
  res.send(users);
});
module.exports = router;
