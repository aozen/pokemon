const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const register = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Check user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: ["email is already taken"] });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save created user to the db
    await newUser.save();

    res.status(201).json({ message: ["User registered successfully"] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: ["Server Error"] });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ errors: ["Authentication failed"] });
    }

    // Check password matches
    const isPasswordMatches = await bcrypt.compare(password, user.password);
    if (!isPasswordMatches) {
      return res.status(401).json({ errors: ["Authentication failed"] });
    }

    // Create JWT Token
    // Check: https://aliozendev.com/post/securing-your-go-web-app-with-jwt-authentication
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ errors: ["Authentication failed"] });
  }
};

module.exports = {
  register,
  login,
};
