const { validationResult } = require("express-validator");
const Pokemon = require("../models/Pokemon");
const apiCall = require("../helpers/apiCall");

const updatePokemons = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }

  const pokemons = await fetchPokemons(req.body.generation);

  try {
    updatePokemonsTable(pokemons, req.body.generation);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }

  return res.status(200).json({ message: "OK" });
};

const fetchPokemons = async (generation) => {
  try {
    const pokemonInfos = await fetchPokemonListByGeneration(generation);

    const pokemonPromises = pokemonInfos.results.map((pokemonInfo) => {
      const pokemon_url = new URL(pokemonInfo.url);
      return apiCall(pokemon_url);
    });

    const pokemonsData = await Promise.all(pokemonPromises);

    return pokemonsData;
  } catch (error) {
    console.error("Error updating Pokemon:", error);
    return [];
  }
};

let fetchPokemonListByGeneration = (generation) => {
  const apiLinks = {
    1: "https://pokeapi.co/api/v2/pokemon?limit=151",
    2: "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100",
    3: "https://pokeapi.co/api/v2/pokemon?offset=251&limit=135",
  };

  const apiLink = apiLinks[generation];

  if (!apiLink) {
    console.error("Invalid generation");
    return;
  }

  const url = new URL(apiLink);

  return apiCall(url);
};

const updatePokemonsTable = async (pokemons, generation) => {
  pokemons.forEach(async (pokemon) => {
    console.log("#######################################################");
    console.log(pokemon.name);
    console.log(pokemon.id);
    let typesArray = pokemon.types.map((types) => types.type.name);
    console.log(typesArray);

    let defaultImageUrl =
      pokemon.sprites.front_default ||
      pokemon.sprites.front_female ||
      pokemon.sprites.back_default ||
      pokemon.sprites.back_female;
    console.log(defaultImageUrl);

    let shinyImageUrl =
      pokemon.sprites.front_shiny ||
      pokemon.sprites.back_shiny ||
      pokemon.sprites.back_shiny_female ||
      pokemon.sprites.front_shiny_female;
    console.log(shinyImageUrl);

    const existingPokemon = await Pokemon.findOne({ id_value: pokemon.id });
    if (existingPokemon) {
      // Update the pokemon
      existingPokemon.generation = generation;
      existingPokemon.name = pokemon.name;
      existingPokemon.type = typesArray;
      existingPokemon.default_image = defaultImageUrl;
      existingPokemon.shiny_image = shinyImageUrl;
      existingPokemon.save();
    } else {
      // Create a new pokemon
      const newPokemon = new Pokemon({
        id_value: pokemon.id,
        generation: generation,
        name: pokemon.name,
        type: typesArray,
        default_image: defaultImageUrl,
        shiny_image: shinyImageUrl,
      });

      // Save created pokemon to the db
      await newPokemon.save();
    }
  });
};

const getPokemons = async (req, res) => {
  console.log("get pokemons");
};

const getByType = async (req, res) => {
  console.log("get pokemons by type");
};

const getShiny = async (req, res) => {
  console.log("get random shiny pokemon");
};

module.exports = {
  updatePokemons,
  getPokemons,
  getByType,
  getShiny,
};
