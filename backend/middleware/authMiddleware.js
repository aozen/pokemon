const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

/**
 * Checks Authorization header and validate existing token
 */
function verifyToken(req, res, next) {
  var token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    token = token.replace(/['"]+/g, ""); // removed double quotes from start and end of the string
    const decoded = jwt.verify(token, "myJwtSecretToken");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { verifyToken };
