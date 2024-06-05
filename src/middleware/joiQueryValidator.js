const ApiError = require("../utils/apiError");
const Joi = require("joi");
const httpStatus = require("http-status");
let validateReqQuery =
  ({ query }) =>
  (req, res, next) => {
    console.log(req.query);
    let result = query.validate(req.query);
    if (result.error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        result.error.details[0].message
      );
    }
    // return res.status(422).json({ message: result.error.details[0].message });
    next();
  };

module.exports = validateReqQuery;
//query
