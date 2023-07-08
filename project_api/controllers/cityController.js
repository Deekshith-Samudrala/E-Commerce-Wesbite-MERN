const app = require("express").Router();
const city = require("../models/city");

app.get("/",async (req,res)=>{
    var result = await city.find();
    res.send(result);
})

app.get("/state",async (req,res)=>{
    var result = await city.distinct("state");
    res.send({success : true,info : result});
})

app.get("/getcity/:statename",async (req,res)=>{
    var result = await city.find({state : req.params.statename})
    res.send({success : true,info : result})
})

module.exports = app;