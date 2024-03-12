const { body } = require('express-validator');

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

const generationValidator = [
  body('generation').notEmpty().withMessage('Generation Shouldnt be empty'),
  body('generation')
    .isInt({ min: 1, max: 3 })
    .withMessage('Generation value must be between 1 to 3'),
];

const typeValidator = [
  body('type')
    .custom((val) => pokemonTypes.includes(val))
    .withMessage('Invalid Type'),
];

module.exports = {
  generationValidator,
  typeValidator,
};
