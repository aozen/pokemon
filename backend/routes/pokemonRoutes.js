const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");
const { pokemonValidator } = require("../validations/pokemon.validator.js");
const { validate } = require("../validations/validate.js");
const { verifyToken } = require("../middleware/authMiddleware");

router.post(
  "/update",
  verifyToken,
  validate(pokemonValidator),
  pokemonController.updatePokemons
);

router.post("/generation", verifyToken, pokemonController.getPokemons);

router.post("/type", verifyToken, pokemonController.getByType);

router.post("/random", verifyToken, pokemonController.getShiny);

module.exports = router;
