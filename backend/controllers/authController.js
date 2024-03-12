const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/user.repository");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const register = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Check user exists
    const existingUser = await userRepo.findOneByEmail(email);
    if (existingUser) {
      return res.status(200).json({ message: 'ERROR.EMAIL_TAKEN' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user object
    const newUserObj = { email, password: hashedPassword };

    // Save user to the db
    const user = await userRepo.create(newUserObj);

    res.status(201).json({ message: 'OK', data: user });
  } catch (error) {
    res.status(500).json({ message: 'ERROR.SYSTEM_ERROR' });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Check user exists
    const user = await userRepo.findOneByEmail(email);
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
