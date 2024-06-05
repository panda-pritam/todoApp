let express = require("express");
let routes = express.Router();
let {
  mongoId,
  filterQueryParam,
  todoJoiSchema,
} = require("../validation/todo.validator");
let validateReqBody = require("../middleware/joiBodyValidator");
let validateReqQuery = require("../middleware/joiQueryValidator");
let validateReqParams = require("../middleware/joiParamValidator");
let {
  addTodoController,
  getTodoById,
  getTodos,
  deleteTodoById,
  updateByID,
} = require("../controller/todo.controller");

const auth = require("../middleware/auth");
//validateReqQuery(filterQueryParam)
routes.get("/tasks", validateReqQuery(filterQueryParam), getTodos);
routes.get("/tasks/:id", getTodoById);
// all the below 3 routes are authorized route.
routes.post("/tasks", auth, validateReqBody(todoJoiSchema), addTodoController);
routes.put("/tasks/:id", auth, updateByID);
routes.delete("/tasks/:id", auth, deleteTodoById);

module.exports = routes;

//validateReqParams(mongoId)
