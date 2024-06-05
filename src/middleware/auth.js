const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");

/*
    this is the callback functions implement custom logic for error handling.
*/
const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || !user || info) {
    reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
  }
  req.user = user;
  resolve();
};

/*
  this is the passport middleware to check wather the user is auth. to access the data or not.
*/
const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;

/// router("/user",p1,p2,cnt)
