require("../config/db")

const mongoose = require("mongoose");

const subcategoryschema = mongoose.Schema({
    name : String
})

const categoryschema = mongoose.Schema({
    name : String,
    subcategory : [subcategoryschema]
},{collection : "Category"})

module.exports = mongoose.model("arbit",categoryschema)
 