const mongoose = require("./db/mongoose");
var Todo = require("./models/todomodel"); 

const express = require("express");
const bodyParser = require("body-parser");


var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{

  var todo = new Todo({
    text: req.body.text,
    completedAt:req.body.completedAt
  });
  todo.save().then((doc)=>{
    res.send(doc);  
  },(err)=>{
    res.status(400).send(err);
  })
 
});


app.listen(3001,()=>{
    console.log("started on port 3001");
});

// var Todo = mongoose.model("Todo",{
//     text:{
//         type:String,      
//         min:1,
//         trim:true,
//         required:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     },
//     completedAt:{
//         type:Number,
//         default:null
//     }

// })
// var newTodo = new Todo({
//   text:"build something unique"   
// })
// var newTodo = new Todo({
//     text:" Edit this video and audio",          // text: 1332 is also accepted but it typecasted into the string . Mongoose uses the concept of typecasting but it is bad practice.
//     completedAt:1232   
//   })

// newTodo.save().then((doc)=>{
//   console.log(doc);
// },(err)=>{
//     if(err)
//      console.log("something is wrong");
// })

// var user = mongoose.model("user",{
//     email:{
//         type:String,
//         trim:true,
//         required:true,
//         min:1
//     }
// })

// var newUser = new user({
//     email: "  it140271155@gmail.com"
// })

// newUser.save().then((doc)=>{
//    console.log(JSON.stringify(doc,undefined,2));
// },(err)=>{
//    console.log("unable to save user");
// })