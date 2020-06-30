const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");
 
var data ={
    id:10
}
var token = jwt.sign(data,"abc123");
console.log(token);

var decoded = jwt.verify(token,"abc123");
console.log(decoded);



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