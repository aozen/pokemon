const { body } = require("express-validator");

const updateValidator = [
  body("generation").notEmpty().withMessage("Generation Shouldnt be empty"),
  body("generation")
    .isInt({ min: 1, max: 3 })
    .withMessage("Generation value must be between 1 to 3"),
];

module.exports = {
  updateValidator,
};
