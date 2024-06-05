const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
var dotenv = require("dotenv");
dotenv.config();
let { userModel } = require("../model/user.model");

const secret = process.env.JWT_SECRET;
console.log(secret);
const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};
const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
    console.log("Payload-> ", payload);
    const user = await userModel.findById(payload.sub);
    // let username = payload.username;
    // let user = await userModel.findOne({ username });
    console.log(user);
    console.log(user);
    return done(null, user);
  } catch (error) {
    console.log(error);
    return done(error, "invalid user");
  }
});

module.exports = strategy;
