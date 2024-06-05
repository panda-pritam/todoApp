let { todoModel } = require("../model/todo.model");
let httpStatus = require("http-status");
let apiError = require("../utils/apiError");
let data = require("../../data"); // this the main data pulling from data.js

class todoService {
  addTodo(todo) {
    // directly push data to the store
    let id = this.getRandomID();
    let obj = {
      ...todo,
      id,
    };
    data.push(obj);
    return obj;
  }
  getTodoById(ID) {
    //find data by id in the data array
    let result = data.find((todo) => todo.id == ID);
    if (result) {
      return result;
    } else {
      throw new apiError(
        httpStatus.NOT_FOUND,
        `Data not found with this id - ${ID}` // is the data is not found by this id send res. data not found
      );
    }
  }
  updateByID(ID, body) {
    let todoObj = this.getTodoById(ID); // check data is present in the array or not if
    //present bing that array, make a copy , update the
    //update the copy array Anf push it and delete the old one.
    this.deleteTodo(ID);
    let newObj = {
      ...todoObj,
      ...body,
    };
    // console.log("new updated object ", newObj);
    data.push(newObj);
    return newObj;
  }
  deleteTodo(ID) {
    let obj = this.getTodoById(ID);
    data = data.filter((todo) => todo.id != ID);
    return obj;
  }
  //this functions will give unique Id every time to add in data
  getRandomID() {
    let id = Date.now() + Math.floor(Math.random() * 100);
    return id;
  }
  getTodos(status, due_date, priority, sortBy) {
    console.log(status, due_date, priority);
    // if User has not passed any data for filtering and sorting the just return the data directly.
    if (!status && !due_date && !priority) {
      if (sortBy) {
        data = this.sortData(data);
        return data;
      }
      return data;
    }
    let list = [];
    // console.log(list);
    if (status) {
      for (let i = 0; i < status.length; i++) {
        let arr = data.filter((todo) => todo.status === status[i]);
        list = [...arr];
        //console.log(status[i], list);
      }
      // console.log("status");
    }
    if (priority) {
      // if user just want to filter the data based on the prority
      if (list.length == 0) {
        for (let i = 0; i < priority.length; i++) {
          let arr = data.filter((todo) => todo.priority === priority[i]);
          list = [...arr, ...list];
        }
      } else {
        // if user want to filter data base on prority and status the we have to apply filter on the list whcih has already filter  based on status
        let temp = [];
        for (let i = 0; i < priority.length; i++) {
          let arr = list.filter((todo) => todo.priority === priority[i]);
          temp = [...arr, ...temp];
        }
        list = [...temp];
      }
      console.log(list);
    }
    if (due_date) {
      console.log("date", due_date);

      if (list.length == 0) {
        let arr = data.filter((todo) => todo.due_date === due_date);
        console.log(arr);
        list = [...arr];
      } else {
        let arr = list.filter((todo) => todo.due_date === due_date);
        console.log(arr);
        list = [...arr];
      }
    }
    if (sortBy) {
      data = this.sortData(list);
      return data;
    }

    return list;
  }

  //Sorting data based on the due date
  sortData(list) {
    list.sort((todo1, todo2) => {
      let field1 = Video1[sortBy];
      let field2 = Video2[sortBy];
      //console.log(field1)

      field1 = new Date(field1).getTime() / 1000;
      field2 = new Date(field2).getTime() / 1000;
      //console.log(field1);

      if (field1 > field2) {
        return -1;
      }
      return 1;
    });
    return list;
  }
}
module.exports = todoService;
