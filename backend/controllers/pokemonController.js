const { validationResult } = require("express-validator");
const Pokemon = require("../models/Pokemon");
const apiCall = require("../helpers/apiCall");

// Key: Generation
// Value: Endpoint for given generation
const pokemonsByGenerationApiLinks = {
  1: "https://pokeapi.co/api/v2/pokemon?limit=151",
  2: "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100",
  3: "https://pokeapi.co/api/v2/pokemon?offset=251&limit=135",
};

/**
 *  Fetchs pokemons from an external api and stores into database
 */
const updatePokemons = async (req, res) => {
  const pokemons = await fetchPokemons(req.body.generation);

  try {
    updatePokemonsTable(pokemons, req.body.generation);
  } catch (error) {
    return res.status(500).json({ message: 'ERROR.SYSTEM_ERROR' });
  }
  return res.status(200).json({ message: 'OK' });
};

/**
 * @params { string } generation - 1,2 or 3
 * @returns { Object} If successful list of pokemons, Otherwise empty object
 */
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
    return {};
  }
};

/**
 * @params { string } generation - 1,2 or 3
 * @returns { Promise } If successful returns promise, Otherwise void
 */
const fetchPokemonListByGeneration = (generation) => {
  const apiLink = pokemonsByGenerationApiLinks[generation];

  if (!apiLink) {
    console.error("Invalid generation");
    return;
  }

  const url = new URL(apiLink);

  return apiCall(url);
};

/**
 *
 * @param { Object } pokemons - List of pokemons
 * @param { String } generation - 1,2 or 3
 * @returns { void }
 */
const updatePokemonsTable = async (pokemons, generation) => {
  pokemons.forEach(async (pokemon) => {
    let typesArray = pokemon.types.map((types) => types.type.name);

    let defaultImageUrl =
      pokemon.sprites.front_default ||
      pokemon.sprites.front_female ||
      pokemon.sprites.back_default ||
      pokemon.sprites.back_female;

    let shinyImageUrl =
      pokemon.sprites.front_shiny ||
      pokemon.sprites.back_shiny ||
      pokemon.sprites.back_shiny_female ||
      pokemon.sprites.front_shiny_female;

    // Note: Didnt found any command for updateIfExists?
    // Not sure for best practice. This section probably is not good written.
    const existingPokemon = await Pokemon.findOne({ id_value: pokemon.id });
    if (existingPokemon) {
      // Update the pokemon
      existingPokemon.generation = generation;
      existingPokemon.name = pokemon.name;
      existingPokemon.type = typesArray;
      existingPokemon.image = defaultImageUrl;
      existingPokemon.shiny_image = shinyImageUrl;
      await existingPokemon.save();
    } else {
      // Create a new pokemon
      const newPokemon = new Pokemon({
        id_value: pokemon.id,
        generation: generation,
        name: pokemon.name,
        type: typesArray,
        image: defaultImageUrl,
        shiny_image: shinyImageUrl,
      });

      // Save created pokemon to the db
      await newPokemon.save();
    }
  });
};

/**
 * Filter pokemons by generation.
 * Sort by ascending id_value.
 */
const getPokemons = async (req, res) => {
  const pokemons = await Pokemon.find({ generation: req.body.generation }).sort(
    { id_value: 1 }
  );

  return res.status(200).json({ message: 'OK', data: pokemons });
};

/**
 * Filter pokemons by type.
 * Sort by ascending id_value.
 */
const getByType = async (req, res) => {
  const pokemonTypes = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
    'shadow',
  ];

  if (!pokemonTypes.includes(req.body.type)) {
    return res.status(200).json({ message: 'ERROR.INVALID_TYPE' });
  }
  const pokemons = await Pokemon.find({ type: req.body.type }).sort({
    id_value: 1,
  });

  return res.status(200).json({ message: 'OK', data: pokemons });
};

/**
 * Find random one pokemon which has shiny_image attributes
 */
const getShiny = async (req, res) => {
  const shinyCount = await Pokemon.countDocuments({
    shiny_image: { $exists: true },
  });
  const randomIndex = Math.floor(Math.random() * shinyCount);
  const randomShinyPokemon = await Pokemon.findOne({
    shiny_image: { $exists: true },
  }).skip(randomIndex);
  if (!randomShinyPokemon) {
    return res.status(200).json({ message: 'ERROR.SHINY_NOT_FOUND' });
  }

  return res
    .status(200)
    .json({ message: 'OK', data: randomShinyPokemon });
};

module.exports = {
  updatePokemons,
  getPokemons,
  getByType,
  getShiny,
};
