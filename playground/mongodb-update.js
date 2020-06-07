const {MongoClient,ObjectID} = require("mongodb"); 


MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
  if(err)
      return console.log("unable to connect to mongodb server");
      console.log("mongodb connected");
      
      const db = client.db("TodoApp");
    // set the new value of field
         
      db.collection("Todos").findOneAndUpdate({
       _id: new ObjectID("5edb3a69a2ffb22438adde6f")
      },
      {
        $set:{
            completed:true
        }
      },{
        returnOriginal : false
      }).then((result)=>{
         console.log(result);
      },(err)=>{
          console.log(err);
            
      })
     // Increment value by 1
      db.collection("Users").findOneAndUpdate({
          _id:new ObjectID("5edc99489e543326c865fe47")
      },{
          $inc:{
             age: 1   
          }
      },{
          returnOriginal:false
      }).then((result)=>{
          console.log(result);
          console.log(result.value);
      },(err)=>{
          console.log(err);
      })
      
      
  
  
   return client.close();
   
});