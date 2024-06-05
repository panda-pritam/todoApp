const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateToken = (userId, type, secret = process.env.JWT_SECRET) => {
  let Payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    type,
  };
  return jwt.sign(Payload, secret);
};
const generateAuthTokens = async (user) => {
  let userId = user._id;
  let type = "access";
  let token = generateToken(userId, type);

  return {
    token: token,
  };
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
