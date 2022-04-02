const express=  require('express')
const mongoose= require('mongoose')
const Joi=  require('Joi')

const Genre = new mongoose.model(
    "Genre",
    new mongoose.Schema({
      name: { type: String, required: true, minlength: 3, maxLength: 55 },
    })
  );


  exports.Genre = Genre;