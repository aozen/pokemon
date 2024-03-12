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
      return res.status(200).json({ message: 'ERROR.EMAIL_TAKEN' });
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

    res.status(201).json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: 'ERROR.SYSTEM_ERROR' });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: 'ERROR.USER_NOT_FOUND' });
    }

    // Check password matches
    const isPasswordMatches = await bcrypt.compare(password, user.password);
    if (!isPasswordMatches) {
      return res.status(200).json({ message: 'ERROR.WRONG_EMAIL_OR_PASSWORD' });
    }

    // Create JWT Token
    // Check: https://aliozendev.com/post/securing-your-go-web-app-with-jwt-authentication
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });

    res.status(200).json({ message: 'OK', data: token });
  } catch (error) {
    res.status(500).json({ message: 'ERROR.SYSTEM_ERROR' });
  }
};

module.exports = {
  register,
  login,
};
