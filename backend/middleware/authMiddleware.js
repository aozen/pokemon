const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../.env");

function verifyToken(req, res, next) {
  var token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    token = token.replace(/['"]+/g, ''); // removed double quotes from start and end of the string
    const decoded = jwt.verify(token, "asd"); //FIXME: JWT_SECRET_KEY undefined
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { verifyToken };
