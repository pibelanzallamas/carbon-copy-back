const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function generateToken(payload) {
  const token = jwt.sign({ payload }, process.env.SECRET, {
    expiresIn: "2h",
  });

  return token;
}

function validateToken(token) {
  return jwt.verify(token, process.env.SECRET);
}

module.exports = { generateToken, validateToken };
