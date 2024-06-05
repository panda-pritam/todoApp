let express = require("express");
let auth = require("../middleware/auth");
let routes = express.Router();
let {
  registerController,
  loginController,
} = require("../controller/user.controller");
let { register, login } = require("../validation/user.validator");
let validateReqBody = require("../middleware/joiBodyValidator");
const passport = require("passport");
const authenticate = passport.authenticate("jwt", { session: false });
console.log(authenticate);

routes.post("/register", validateReqBody(register), registerController);
routes.post("/login", validateReqBody(login), loginController);
routes.get("/data", auth, (req, res) => res.send("Hello u can get data "));

module.exports = routes;
