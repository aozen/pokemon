const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  id_value: {
    type: Number,
    required: true,
    unique: true,
  },
  generation: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  type: {
    type: [],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  shiny_image: {
    type: String,
  },
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);
module.exports = Pokemon;
