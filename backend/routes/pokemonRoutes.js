const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");
const {
  generationValidator,
  typeValidator,
} = require("../validations/pokemon.validator.js");
const { validate } = require("../validations/validate.js");
const { verifyToken } = require("../middleware/authMiddleware");

router.post(
  '/update',
  verifyToken,
  validate(generationValidator),
  pokemonController.updatePokemons
);

router.post(
  '/generation',
  validate(generationValidator),
  verifyToken,
  pokemonController.getPokemons
);

router.post(
  '/type',
  validate(typeValidator),
  verifyToken,
  pokemonController.getByType
);

router.get('/random', verifyToken, pokemonController.getShiny);

module.exports = router;
