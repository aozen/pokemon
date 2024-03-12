const express = require("express");
const authController = require("../controllers/authController");
const { validate } = require("../validations/validate.js");
const {
  registerValidator,
  loginValidator,
} = require("../validations/user.validator.js");

const router = express.Router();

router.post("/register", validate(registerValidator), authController.register);

router.post("/login", validate(loginValidator), authController.login);

module.exports = router;
