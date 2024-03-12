const Pokemon = require('../models/Pokemon');

const findOneByIdValue = async (id_value) => {
  return await Pokemon.findOne({ id_value }).lean();
};

const update = async (_id, pokemonObject) => {
  return await Pokemon.findOneAndUpdate({ _id }, pokemonObject, {
    new: true,
    omitUndefined: true,
  }).lean();
};

const create = async (pokemonObject) => {
  const pokemon = await Pokemon.create(pokemonObject);
  return pokemon.toObject();
};

const findAllByGeneration = async (generation) => {
  return await Pokemon.find({ generation }).sort({ id_value: 1 }).lean();
};

const findAllByType = async (type) => {
  return await Pokemon.find({ type }).sort({ id_value: 1 }).lean();
};

const count = async (query) => {
  return Pokemon.countDocuments(query);
};

const getRandom = async (query, max) => {
  const randomIndex = Math.floor(Math.random() * max);
  return await Pokemon.findOne(query).skip(randomIndex).lean();
};

module.exports = {
  findOneByIdValue,
  update,
  create,
  findAllByGeneration,
  findAllByType,
  count,
  getRandom,
};
