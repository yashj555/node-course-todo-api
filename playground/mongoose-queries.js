const {ObjectID} = require("mongodb");
const mongoose = require("./../server/db/mongoose");
const Todo = require("./../server/models/todomodel");



var id = "5edeab439e334c129c1d9450";   // mongoose automatically converts the id into the objectid.

// if you put the valid id but not present in collection then you find the null value but if you place invalid id then it will throw error
if(!ObjectID.isValid(id))
  console.log("Id is not valid");

Todo.find({
    _id:id
}).then((todos)=>{
    if(!todos)
     console.log("unable to find the todos");
   console.log(todos);
}).catch((err)=>{
  console.log(err);
})

Todo.findOne({
    _id:id
}).then((todo)=>{
    if(!todo)
     console.log("unable to find the todo");
     console.log(todo);
 }).catch((err)=>{
    console.log(err);
  })

Todo.findById(id).then((todo)=>{
    if(!todo)
     console.log("unable to find the todo");
    console.log(todo);
}).catch((err)=>{
    console.log(err);
  }); 