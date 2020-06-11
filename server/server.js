const mongoose = require("./db/mongoose");
const {ObjectID} = require("mongodb");

var Todo = require("./models/todomodel"); 

const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.Port || 3001;
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
 // capture in a object ({todos}) to make it more flexible
app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
       res.send({todos});                                                               
  },(err)=>{
     res.status(400).send(err);
  })
})

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id))
     return res.status(404).send();
  Todo.findById(id).then((todo)=>{
    if(!todo)
      return res.status(404).send();
    res.send({todo});
  },(err)=>{
    res.status(400).send();
  })   

  //res.send(req.params);
})


app.listen(port,()=>{
    console.log("started on port "+port);
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


//mongolab-cylindrical-17725