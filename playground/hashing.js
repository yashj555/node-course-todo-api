const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var password = "123abc!";
// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//       console.log(hash);
//     });
// })

var pass1 = "$2a$10$t4mhBQ.Ms1Gaxao3lKQAHubG/pS92NZLS/yzysSV0oN2nQ3a6MGsW";
var pass2 = "$2a$10$tdUuUq87mvTGroTAl8h4K.A.4d9gEmS/IISXzHxrkyOkZpvzkzOe2";
var pass3 = "$2a$10$6LXNPzqNI03GTR5yJOmTD.CCN.ERxcPybo9.j9tMSSy8zRBHvqIbC"; 

bcrypt.compare(password,pass1,(err,res)=>{
    console.log(res);   // true
});
bcrypt.compare(password,pass2,(err,res)=>{
    console.log(res);  //true
});
bcrypt.compare(password,pass3,(err,res)=>{
    console.log(res);  //true
});

// var data ={
//     id:10
// }
// var token = jwt.sign(data,"abc123");
// console.log(token);

// var decoded = jwt.verify(token,"abc123");
// console.log(decoded);



// var message = "i am user number 3";
// var hash = SHA256(message).toString();

// console.log(hash);
// // hashing is a one way algorithm. After getting a hashvalue of the message you wont get the message back from hashcode.
// // It always get the same hashcode of a particular message . It uses to store the password in a database because storing password 
// // as a text is a bad practice . 

// var data ={
//     id:4
// }
// var token = {
//     data,
//     hash:SHA256(JSON.stringify(data)+'somesecret').toString()
// }
// // "somesecret" is basically a salt which is added to provide more security so that if user able to generate a hashcode of data 
// // it will not same due to salt.
// // 

// token.data.id=5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if(token.hash == resultHash)
//   console.log("data is not changed");
// else
//   console.log("data is changed dont trust");  