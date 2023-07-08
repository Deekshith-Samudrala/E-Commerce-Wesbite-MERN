const express = require("express");
const app = express.Router();
const user = require("../models/user");
const sha1 = require("sha1");

app.get("/",async (req,res)=>{
    let result = await user.find();
    res.send({success : true,info : result})
})

app.post("/", async(req,res)=>{
    delete req.body.repass; 
    req.body.password = sha1(req.body.password);
    let result1 = await user.find({email : req.body.email});
    let result2 = await user.find({name : req.body.name});
    if(result1.length > 0){
        res.send({succes : false,err : 1})
    }
    else if (result2.length > 0){
        res.send({succes : false,err : 2})
    } else{
        await user.create(req.body); 
        res.send({success : true})
    }
})

app.put("/:id",async(req,res)=>{
    let result1 = await user.find({_id : req.params.id});
    if(result1[0].password == sha1(req.body.password)){
        req.body.password = sha1(req.body.password);
        let result = await user.updateOne({_id : req.params.id},req.body);
        res.send({success : true,info: result});
    }
    else{
        res.send({success : false,error : 1});
    }
})


app.put("/password/:id",async(req,res)=>{
    let result1 = await user.find({_id : req.params.id});
    if(result1[0].password == sha1(req.body.password)){
        result1[0].password = sha1(req.body.newpass);
        let result = await user.updateOne({_id : req.params.id},result1[0]);
        res.send({success : true,info: result});
    }
    else{
        res.send({success : false,error : 1});
    } 
})

app.delete("/:userid", async(req,res)=>{
    let result = await user.deleteMany({_id : req.params.userid});
    res.send({success : true,info : result});
})

module.exports = app;
    