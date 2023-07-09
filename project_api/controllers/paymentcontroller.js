const app = require("express").Router();
const Razorpay = require("razorpay");

const instance = new Razorpay({ key_id: 'rzp_test_7OB2HvgWNjQdKa', key_secret: 'KzJbaBB6TpBz5u8CjbDlTdUT' });

app.post("/",async(req,res)=>{
    instance.orders.create({
        amount: 50000,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
          key1: "value3",
          key2: "value2"
        }
      })
})



module.exports = app;