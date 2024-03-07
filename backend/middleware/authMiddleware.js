const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

function verifyToken(req, res, next) {
  var token = req.header("Authorization");
  if (!token) {
    console.log("NO TOKEN");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    token = token.replace(/['"]+/g, ""); // removed double quotes from start and end of the string
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { verifyToken };
