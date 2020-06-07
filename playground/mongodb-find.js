const {MongoClient,ObjectID} = require("mongodb"); 


MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
  if(err)
      return console.log("unable to connect to mongodb server");
      console.log("mongodb connected");
      
      const db = client.db("TodoApp");

      db.collection('Users').find({_id:new ObjectID("5edd331576becd0078d50590")}).toArray().then((docs)=>{
            console.log(docs.length); 
            console.log(JSON.stringify(docs,undefined,2));   
      },(err)=>{
        console.log("unable to fetch todos "+err);

      })
      
  
  
   return client.close();
   
});