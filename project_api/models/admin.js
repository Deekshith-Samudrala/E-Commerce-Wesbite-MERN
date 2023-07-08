require("../config/db");

const mongoose = require("mongoose");
const adminschema = mongoose.Schema({
    pin : Number,
    password : String
},{collection : "adminlogindetails"}) 

module.exports = mongoose.model("adminlogindeets",adminschema);