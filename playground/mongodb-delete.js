const {MongoClient,ObjectID} = require("mongodb"); 


MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
  if(err)
      return console.log("unable to connect to mongodb server");
      console.log("mongodb connected");
      
      const db = client.db("TodoApp");
    
    // deleteMany----> delete many but does not return result  
           db.collection("Todos").deleteMany({text:"independence of hong kong"}).then((result)=>{
               //  console.log(result);
           },(err)=>{
                if(err)
                 console.log("unable to delete the data");  
           })
    //deleteone ----> delete one but does not return result   
           db.collection("Todos").deleteOne({text:"independence of hong kong"}).then(()=>{
                 
           },(err)=>{
               if(err)
                 console.log("unable to delete the data");  
           })  
    //findandDeleteone ---->delete one but return deleted document  
           db.collection("Todos").findOneAndDelete({text:"independence of hong kong"}).then((result)=>{
               console.log(result);  
           },(err)=>{
                if(err)
                console.log("unable to delete the data");  
           })          
      
  
  
   return client.close();
   
});