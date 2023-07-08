require("../config/db");

const mongoose = require("mongoose");
const couponschema = mongoose.Schema({
    couponname : String,
    discount : Number
}) 

module.exports = mongoose.model("coupons",couponschema);