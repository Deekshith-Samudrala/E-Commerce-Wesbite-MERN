require("../config/db")

const mongoose = require("mongoose");

const cartschema = mongoose.Schema({
    userid : String,
    Cart : [{ type: Object }]
}) 

module.exports = mongoose.model("cart",cartschema);