const express = require("express");
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/checkUser", verifyToken, (req, res) => {
  res.status(200).json({ message: "Logged in Successfully", userId: req.userId });
});

module.exports = router;
