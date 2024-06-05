const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
let validate = require("mongoose-validator");
// const { required } = require("joi");

let userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (value) => validator.isEmail(value),
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.isPasswordMatch = async function (password) {
  let user = this;
  //console.log("User.passward-> ", user.password, ", Passward-> ", password);
  return await bcrypt.compare(password, user.password);
};
userSchema.statics.isEmailTaken = async function (email) {
  let user = await this.findOne({ email });
  return !!user; // this user is empty !user -> true -> !true -> false;
};
let userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
