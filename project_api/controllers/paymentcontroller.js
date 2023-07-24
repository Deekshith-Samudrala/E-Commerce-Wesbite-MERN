const app = require("express").Router();
const Razorpay = require("razorpay");
const user = require("../models/user");

const {RZP_ID,RZP_SECRET} = process.env;

const instance = new Razorpay({ key_id: RZP_ID, key_secret: RZP_SECRET});

app.post("/createOrder",async(req,res)=>{
    var options = {
        amount: req.body.totalprice * 100, // amount is divided by 100 
        currency: "INR",
        receipt: "ditusamudrala@gmail.com",
        notes : req.body.items,
    };
    instance.orders.create(options, (err,order)=>{
        if(!err){
            console.log("success");
            let result = await user.create({id : order._id,items : req.body.items});
            res.send({
                success : true, 
                info : order})
        }
        else{
            console.log("Failed");
            res.send({
                success : false , 
                info : order })
        }
    })
})



module.exports = app;