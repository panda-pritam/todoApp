let Joi = require("joi");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

function validateReqBody({ body }) {
  return (req, res, next) => {
    if (Object.keys(req.body).length !== 0 && !req.is("application/json")) {
      return next(
        new ApiError(
          httpStatus.UNSUPPORTED_MEDIA_TYPE,
          "Supports JSON request body only"
        )
      );
    }
    let result = body.validate(req.body);
    if (result.error) {
      //console.log("------------------------->",result.error.details[0].message)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        result.error.details[0].message
      );
    }
    // return res.status(422).json({ message: result.error.details[0].message });
    next();
  };
}

module.exports = validateReqBody;
