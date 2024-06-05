const mongoose = require("mongoose");
const validator = require("validator");

let validate = require("mongoose-validator");
const { required } = require("joi");

let todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
});

let todoModel = mongoose.model("todos", todoSchema);
module.exports = { todoModel };
