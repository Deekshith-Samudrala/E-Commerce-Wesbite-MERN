const express = require("express"); 
const app = express.Router();
const jwt = require("jsonwebtoken");
const adminlogindetails = require("../models/admin");
const sha1 = require("sha1");


app.post("",async (req,res)=>{
    let result = await adminlogindetails.find({pin : req.body.pin});
    if(result.length > 0){
        if(sha1(req.body.password) == result[0].password){
            var obj = {pin : result[0].pin , password : result[0].password};
            var token = jwt.sign(obj,"Hello");
            res.send({success : true,token : token})
        }
        else{
            res.send({success : false,err : 1})
        }
    }
    else{
        res.send({success : false,err : 2})
    }
})

app.get("/:x",(req,res)=>{
    let result = jwt.decode(req.params.x,"Hello");
    res.send({success : true,info : result});
})

app.put("",async (req,res)=>{
    let formdata = req.body.formdata;
    let actualdata = req.body.actualdata;
    if(sha1(formdata.oldpass) == actualdata.password){
        var obj = {pin : actualdata.pin , password : sha1(formdata.newpass)};
        var token = jwt.sign(obj,"Hello");
        await adminlogindetails.updateMany({pin : formdata.pin},obj);
        res.send({success : true,info : token});
    }
    else{
        res.send({success : false});
    }
})

module.exports = app;