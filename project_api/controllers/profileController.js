const express = require("express");
const app = express.Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");

app.get("/:x", async(req,res)=>{
    var a = req.params.x;
    var obj = jwt.decode(a,"Hello");
    var result = await user.find({_id : obj.id})
    res.send({success : true,info : result[0]});
})

app.get("/data/:userid",async(req,res)=>{
    let result = await user.find({_id : req.params.userid})
    res.send({success : true,info : result});
})

app.get("/userdeetbyname/:username",async(req,res)=>{
    let result = await user.find({name : req.params.username})  
    res.send({success : true,info : result})
})

module.exports = app;
    