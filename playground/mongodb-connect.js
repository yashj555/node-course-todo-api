//const MongoClient = require("mongodb").MongoClient;
const {MongoClient,ObjectID} = require("mongodb"); 
// var objectid = new ObjectID();
// console.log(objectid);

MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
  if(err)
      return console.log("unable to connect to mongodb server");
      console.log("mongodb connected");
      const db = client.db("TodoApp");

   db.collection('todos').insertOne({
     text:"Work is pending",
     completed: "false"
   },(err,result)=>{
      if(err) 
         return console.log("unable to insert the data");    
       
       console.log(result.ops);  
       console.log(JSON.stringify(result.ops,undefined,2));  
      
   });   
  db.collection('Users').insertOne({
    name:"abhi",
    age:"24",
    location: "uttar pradesh"
  },(err,result)=>{
      if(err)
        return console.log("unable to insert the data");
       // console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
       console.log(result.ops[0]._id.getTimestamp());
  });
   return client.close();
   
});