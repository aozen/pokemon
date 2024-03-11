const express = require("express");
const authController = require("../controllers/authController");
const {
  registerValidator,
  loginValidator,
} = require("../validations/user.validator.js");

const router = express.Router();

router.post("/register", registerValidator, authController.register);

router.post("/login", loginValidator, authController.login);

module.exports = router;
