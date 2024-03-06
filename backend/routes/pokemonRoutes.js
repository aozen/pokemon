const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");
const { updateValidator } = require("../validations/pokemon.validator.js");

router.post("/update", updateValidator, pokemonController.updatePokemons);

router.get("/generation", pokemonController.getPokemons);

router.get("/type", pokemonController.getByType);

router.get("/random", pokemonController.getShiny);

module.exports = router;
