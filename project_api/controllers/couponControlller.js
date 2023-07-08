const app = require("express").Router();
const coupon = require("../models/coupon");

app.get("/getcoupon/:couponname",async(req,res)=>{
    let result = await coupon.find({couponname : req.params.couponname});
    if(result.length){
        res.send({success : true,info : result})
    }
    else{
        res.send({success : false,err : 1})
    }
})

module.exports = app;   