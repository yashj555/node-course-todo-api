const {ObjectID} = require("mongodb");
const mongoose = require("./../server/db/mongoose");
const Todo = require("./../server/models/todomodel");


// Todo.remove({}).then((result)=>{
//     console.log(result);
// },(err)=>{
 //    console.log(err);
// })

// Todo.findOneAndDelete({}).then((result)=>{
//      console.log(result);                           
// },(err)=>{
//     console.log(err);
// })


Todo.findByIdAndRemove("5ee2b059b16c7a4f3efec466").then((todo)=>{
   console.log(todo);
},(err)=>{
   console.log(err);
})