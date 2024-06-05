// const { join } = require("core-js/core/array");
let Joi = require("joi");
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

//custom logic to check the date -> date should not be of past
const dateCheck = (value, helpers) => {
  let today = Date.now();
  let date = new Date(value);
  // console.log("Data", date, "today", today, date < today);
  if (date < today) {
    return helpers.message('"{{#label}}" date should not be of past.');
  }
  return value;
};
let todoJoiSchema = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string()
      .valid("pending", "in progress", "completed")
      .required(),
    due_date: Joi.date().required().custom(dateCheck),
    priority: Joi.string().valid("low", "medium", "high").required(),
  }),
};

let filterQueryParam = {
  query: Joi.object().keys({
    title: Joi.string(),
    priority: Joi.string(),
    status: Joi.string(),
    due_date: Joi.date().custom(dateCheck),
    sortBy: Joi.string().valid("due_date"),
  }),
};

let mongoId = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = { mongoId, filterQueryParam, todoJoiSchema };
