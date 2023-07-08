const app = require("express").Router();
const cart = require("../models/Cart");

app.post("/addtocart/:userid",async (req,res)=>{
    let result = await cart.updateOne({ userid : req.params.userid},{$push : {Cart : req.body}});
    res.send({success : true,info : req.body});
})

app.post("/:userid",async(req,res)=>{
    let result = await cart.create({userid : req.params.userid});
})

app.get("/:userid",async(req,res)=>{
    let result = await cart.find({userid : req.params.userid});
    res.send({success : true,info : result});
})

app.delete("/:userid",async(req,res)=>{
    let result = await cart.updateOne({userid : req.params.userid},{$set : {"Cart" : []}})
    res.send({success : true});
})

app.delete("/:userid/:itemid",async (req,res)=>{
    let result = await cart.findOneAndUpdate({userid : req.params.userid},{ $pull : { Cart : {_id : req.params.itemid}}});
    res.send({success : true,info : result, delid : req.params.itemid});
})

module.exports = app;