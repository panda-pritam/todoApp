let express = require("express");
let { errorHandler } = require("./src/middleware/error");
const cors = require("cors");
const passport = require("passport");
const JWTStrategy = require("./src/JWT/jwtStrategy");
const ApiError = require("./src/utils/apiError");
const userRoutes = require("./src/router/user.routes");
let todoRoute = require("./src/router/todo.routes");

// let router = require("./routes/videos.router");
const httpStatus = require("http-status");
// let { authRout } = require("./routes/auth.route");
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

passport.use(JWTStrategy);
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-type, Authorization");
  next();
});

app.get("/", (req, res) => {
  console.log("Server is up and running");
  res.send("Server is up and running");
});
app.use("/user", userRoutes);
app.use("/todos", todoRoute);

app.use(errorHandler);

module.exports = app;
