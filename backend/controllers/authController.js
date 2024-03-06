const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../.env");

const register = async (req, res) => {
  try {
    console.log(req);
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    // Check user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "email is already taken" });
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

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Check password matches
    const isPasswordMatches = await bcrypt.compare(password, user.password);
    if (!isPasswordMatches) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Create JWT Token
    // Check: https://aliozendev.com/post/securing-your-go-web-app-with-jwt-authentication
    console.log(JWT_SECRET_KEY);
    console.log(user._id);
    const token = jwt.sign({ userId: user._id }, "asd", { //FIXME: JWT_SECRET_KEY undefined
      expiresIn: "3h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// TODO: Check best practice?
module.exports = {
  register,
  login,
};
