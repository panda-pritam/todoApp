const mongoose = require("mongoose");
const { userModel } = require("../model/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");
class userService {
  async register(data) {
    if (await userModel.isEmailTaken(data.email)) {
      throw new ApiError(httpStatus.OK, "Email already taken");
    } else {
      let hashedPassword = await this.getHashedPassword(data.password);

      let newObj = {
        ...data,
        password: hashedPassword,
      };
      let result = await userModel.create(newObj);
      return result;
    }
  }
  async login({ email, password }) {
    let user = await userModel.findOne({ email: email });
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Incorrect email or password"
      );
    }

    return user;
  }
  async getHashedPassword(passward) {
    let hashedPassword = await bcrypt.hash(passward, 10);
    return hashedPassword;
  }
}

module.exports = userService;
