const mongoose = require("mongoose");

var Todo = mongoose.model("Todo",{
    text:{
        type:String,      
        min:1,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }
})

  module.exports=Todo;  