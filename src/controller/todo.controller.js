let todoService = require("../services/todo.service");
let httpStatus = require("http-status");
let apiError = require("../utils/apiError");
let catchAsync = require("../utils/catchAsync");
let statusArr = ["pending", "in progress", "completed"];
let priorityArr = ["low", "high", "medium"];

let todo = new todoService();

/*
controller to add new taskes to the data store-----------------------

this allow only authorize user to post the data

URL-> POST -> http://localhost:8082/todos/tasks
  data ha to be pass in req. body
  body: ex->body:{
    "title": "buy some beeare",
    "description": "Water all the indoor plants",
    "status": "completed",
    "due_date": "2024-06-06",
    "priority": "low"

}
also user has to send the AUTH TOKEN in req.header.Authorization  token as  Bearer Token
*/
let addTodoController = (req, res) => {
  console.log("add todo controler");
  let data = todo.addTodo(req.body);

  if (data) {
    res.status(201).json({ user: data });
  }
};
/*controller to fetch taskes from the data store-----------------------

  Filtering and Sorting data  
  1-> user can filter the data also by task ststus , task prority ,task due date
  2-> user can also sort the data if he wants based on due date ....

  for this user has to pass query params in the url.
  ex-GET-> http://localhost:8082/todos/tasks?status=in progress&priority=low,high&due_date=2024-06-19&sortBy=due_date

  controller will return data by filtering and sorting based on params present in the url.

  ex->GET-> http://localhost:8082/todos/tasks

  this is going to return all the tasks present in the db
  

*/

let getTodos = (req, res) => {
  console.log(req.query);
  /*
    Prevent user to pass any random set of data for filter 
    so we r putting a check to prevent user or notify user if he sends some wrong information for filtering.
  */
  if (req.query.status) {
    req.query.status.split(",").map((ele) => {
      if (!statusArr.includes(ele)) {
        res
          .status(httpStatus.BAD_REQUEST)
          .json({ msg: `status can only form this options ${statusArr}` });
      }
    });
  }
  if (req.query.priority) {
    req.query.priority.split(",").map((ele) => {
      if (!priorityArr.includes(ele)) {
        res
          .status(httpStatus.BAD_REQUEST)
          .json({ msg: `priority can only form this options ${priorityArr}` });
      }
    });
  }

  //extracting all the value from the url and sending to the service to process the data.
  let status = req.query.status ? req.query.status.split(",") : null;
  let due_date = req.query.due_date ? req.query.due_date : null;
  let priority = req.query.priority ? req.query.priority.split(",") : null;
  let sortby = req.query.sortby ? req.query.sortby : null;
  let data = todo.getTodos(status, due_date, priority, sortby);
  // console.log(data);
  if (data.length) {
    res.status(httpStatus.FOUND).send(data);
  } else {
    res.status(404).send({ msg: "data not found" });
  }
};
/*
  ->controller to get data by id
  id has to be pass on the url param
  ex->GET->http://localhost:8082/todos/tasks/<id>
*/
let getTodoById = (req, res) => {
  let { id } = req.params;
  let data = todo.getTodoById(id);
  if (data) {
    res.status(httpStatus.FOUND).send(data);
  }
};
/*
  controller to updata the data . data will be fetch by id first 
  id has to pass on url and data has to be pass in body to update
  ex->body:{
    "title": "buy some beeare",
    "description": "Water all the indoor plants",
    "status": "completed",
    "due_date": "2024-06-06",
    "priority": "low"

}
  PUT->http://localhost:8082/todos/tasks/<id>
  also user has to send the AUTH TOKEN in req.header.Authorization  token as  Bearer Token
  this allow only authorize user to post the data
*/
let updateByID = (req, res) => {
  console.log("update");
  let { id } = req.params;
  let data = todo.updateByID(id, req.body);
  console.log(id, data, req.body);
  if (data) {
    res.status(httpStatus.FOUND).send(data);
  }
};
/*
  controller to delete data, pass if in url
  URL-> DELETE ->http://localhost:8082/todos/tasks/<id>
  also user has to send the AUTH TOKEN in req.header.Authorization  token as  Bearer Token
  this allow only authorize user to post the data
*/
let deleteTodoById = (req, res) => {
  let { id } = req.params;
  let data = todo.deleteTodo(id);
  if (data) {
    res.status(200).send(data);
  }
};

// let paginations = (count, skip, data) => {
//   localStorage.setItem("count", 0);
//   //get initail count
//   if (data.length < count) {
//     return data;
//   }
//   let initailCount = localStorage.getItem("count");
//   if (initailCount) {
//     let idx = initailCount + count;
//     localStorage.setItem("count", idx);
//     return data.slice(initailCount, idx);
//   }
// };
module.exports = {
  addTodoController,
  getTodoById,
  getTodos,
  deleteTodoById,
  updateByID,
};
