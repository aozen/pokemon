const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

/**
 * Checks Authorization header and validate existing token
 */
function verifyToken(req, res, next) {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(200).json({ message: 'ERROR.JWT_TOKEN_NOT_FOUND' });
  }

  try {
    token = token.replace(/['"]+/g, ""); // removed double quotes from start and end of the string
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(200).json({ message: 'ERROR.JWT_TOKEN_NOT_FOUND' });
  }
}

module.exports = { verifyToken };
