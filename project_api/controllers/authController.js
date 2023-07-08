const express = require("express"); 
const app = express.Router();
const user = require("../models/user");
const sha1 = require("sha1");
const jwt = require("jsonwebtoken");

// token based authentication
app.post("/", async(req,res)=>{
    var e = req.body.email;
    var p = req.body.password;

    var result = await user.find({ email : e });
    if(result.length > 0){
        if(result[0].password == sha1(p)){
            var obj = {id : result[0]._id , name : result[0].name};
            var token = jwt.sign(obj,"Hello");
            res.send({success : true ,token : token,userid : result[0]._id});
        }
        else{
            res.send({success : false ,errType : 1});
        }
    }
    else{
        res.send({success : false, errType : 2});
    }
})

app.get("/",(req,res)=>{
    res.send("success");
})

module.exports = app;
    