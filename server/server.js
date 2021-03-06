const _ = require("lodash");
const mongoose = require("./db/mongoose");
const {ObjectID} = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const {authenticate} = require("./middleware/authenticate");

var Todo = require("./models/todomodel"); 
var User = require("./models/usermodel");




const port = process.env.PORT || 3001;
var app = express();

app.use(bodyParser.json());

app.post('/todos',authenticate,(req,res)=>{

  var todo = new Todo({
    text: req.body.text,
    _creator:req.user._id
    
  });
  todo.save().then((doc)=>{
    res.send(doc);  
  },(err)=>{
    res.status(400).send(err);
  })
 
});
 // capture in a object ({todos}) to make it more flexible
app.get('/todos',authenticate,(req,res)=>{
  Todo.find({_creator:req.user._id}).then((todos)=>{
       res.send({todos});                                                               
  },(err)=>{
     res.status(400).send(err);
  })
})

app.get('/todos/:id',authenticate,(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id))
     return res.status(404).send();
  Todo.findOne({ _id:id, _creator:req.user._id}).then((todo)=>{
    if(!todo)
      return res.status(404).send();
    res.send({todo});
  },(err)=>{
    res.status(400).send();
  })   

  //res.send(req.params);
})

app.delete('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id))
     return res.status(404).send();
   Todo.findOneAndRemove( {_id:id, _creator:req.user._id}).then((todo)=>{
      if(!todo)
        return res.status(404).send();
        res.send({todo});   
   },(err)=>{
       res.status(400).send();    
   })  
})

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,["text","completed"]);
  
  if(!ObjectID.isValid(id))
     return res.status(404).send(); 

    if(_.isBoolean(body.completed) && body.completed) 
      body.completedAt = new Date().getTime();
    else
    {
     body.completed = false;
     body.completedAt = null;
    }
    Todo.findOneAndUpdate({ _id:id , _creator:req.user._id},{$set:body},{new:true}).then((todo)=>{
         if(!todo)
          return res.status(404).send();

          res.send(todo);
    }).catch((err)=>{
          res.status(400).send();  
    })  
})

app.post("/users",(req,res)=>{
 var body = _.pick(req.body,["email","password"]);
 var user = new User({
    email: body.email,
    password:body.password
   })
 user.save().then(()=>{
     return user.generateAuthToken(); 
    
 },(err)=>{
    res.status(400).send(err);  
 }).then((token)=>{
  res.header('x-auth',token).send(user); 
})


app.post("/users/login",(req,res)=>{
  var body = _.pick(req.body,["email","password"]);

  User.findByCredentials(body.email,body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user); 
    });
  }).catch((e)=>{
    res.status(401).send();
  })

})
 

  // x-auth is basically denotes the customize header it is not necessarily the http header used by default
})

app.delete("/user/me/token",authenticate,(req,res)=>{
   req.user.removeToken(req.token).then(()=>{
     res.status(200).send();
   })
});





app.get("/user/me",authenticate,(req,res)=>{
  res.send(req.user);

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