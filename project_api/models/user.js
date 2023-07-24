require("../config/db");

const mongoose = require("mongoose");
const userschema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    address : String,
    gender : String,
    city : String,  
    contact : String,
    state : String,
    orders : [{ type: Object }]
}) 

module.exports = mongoose.model("user",userschema);