const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");
const { updateValidator } = require("../validations/pokemon.validator.js");
const { verifyToken } = require("../middleware/authMiddleware");

router.post(
  "/update",
  updateValidator,
  verifyToken,
  pokemonController.updatePokemons
);

router.post("/generation", verifyToken, pokemonController.getPokemons);

router.get("/type", verifyToken, pokemonController.getByType);

router.get("/random", verifyToken, pokemonController.getShiny);

module.exports = router;
