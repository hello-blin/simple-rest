const mongoose = require("mongoose");
const Joi = require("joi");


const rentalSchema = new mongoose.model(
  "rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: { type: String, required: true, minLength: 5, maxLength: 55 },
        isGold: { type: Boolean, default: false },
        phone: { type: String, required: true, mingLength: 5, maxLength: 55 },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minLength: 5,
          maxLength: 55,
        },
        dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
      }),
      required: true,
    },
    dateOut: { type: Date, required: true, default: Date.now() },
    rentalFee: { type: Number, min: 0 },
  })
);

function validateRental() {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  };

  return Joi.validate(rental, schema);
}


exports.Rental = rentalSchema;
exports.validateRental = validateRental;

