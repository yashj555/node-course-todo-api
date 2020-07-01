const  mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
// {
//     email:"yashjaiswal1405@gmail.com"
//     password:"hsdhdhdhcaggcgsksgc"
//     tokens:[{
//         access:"auth",
//         token:"gjsgvcsdhghsdjchsdcka"
//     }]
// }
var UserSchema = new mongoose.Schema({
        email:{
            type:String,
            required:true,
            trim:true,
            minlength:1,
            unique: true,
            validate: {
               validator:(value)=>{
                 return validator.isEmail(value);
               },
               message: "it is not a valid email"
            },
           
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },
        tokens:[{
          access:{
              type:String,
              required:true
          },
          token:{
              type:String,
              required:true
          }
        }]
});
UserSchema.methods.toJSON=function()
{   
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject,["_id","email"]);
}
UserSchema.methods.generateAuthToken=function()
{
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},"abc123").toString();
    user.tokens.push({
        access,
        token
    });
    return user.save().then(()=>{
       return token;
    }
    )
}
UserSchema.statics.findByToken=function(token)
{ 

  var self = this;
  var decoded ;
    try
    {
        decoded = jwt.verify(token,"abc123");
    }
    catch(e)
    {   
        return new Promise((resolve,reject)=>{
           reject(); 
        })
    }
   return User.findOne({
        "_id":decoded._id,
        "tokens.token":token,
        "tokens.access":"auth"
    })
     
}
// this middleware called before the document "save"
UserSchema.pre("save",function(next){
   console.log("save middleware is called"); 
   var user = this;
   console.log(user.isModified("password"));
   if(user.isModified("password"))
   {   
       bcrypt.genSalt(10,(err,salt)=>{
           bcrypt.hash(user.password,salt,(err,hash)=>{
              user.password = hash;
              console.log(user.password);
              next();
           })
       })
      
   }
   else
      next();
})

var User = mongoose.model("user",UserSchema);

module.exports = User