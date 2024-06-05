let catchAsync = require("../utils/catchAsync");
let ApiError = require("../utils/apiError");
let httpStatus = require("http-status");
let userService = require("../services/user.service");
let { generateToken, generateAuthTokens } = require("../services/tokenService");
// let  { use } from "passport";
let userInstance = new userService();

/*
  User has to register to get JWT token 
  URL=POST:->http://localhost:8082/user/register

  and data is to be passed in body
  req.body:{
    "fullname":"Pritam Mondal",
    "email":"abcc@gamil.com",
    "password":"abc"
}
  
*/

const registerController = catchAsync(async (req, res) => {
  let body = req.body;
  console.log("Body-> ", body);

  let user = await userInstance.register(body);
  res.status(httpStatus.CREATED).send({ code: httpStatus.CREATED, user: user });
});

/*
  user has to login and if login is done send jwt token
  URL:POST-> http://localhost:8082/user/login

  req.body:{
   
    "email":"abc@gamil.com",
    "password":"abc"
  }
*/
const loginController = catchAsync(async (req, res) => {
  let body = req.body;
  console.log("Body-> ", body);
  let user = await userInstance.login(body);
  let jwtToken = await generateAuthTokens(user);
  res.status(200).json({ user: user, jwtToken });
});

module.exports = { registerController, loginController };
