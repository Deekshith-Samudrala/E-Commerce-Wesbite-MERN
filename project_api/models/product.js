require("../config/db");

const mongoose = require("mongoose");
const { Schema } = mongoose;

let productschema = mongoose.Schema({
    title : String,
    price : Number,
    details : String,
    image : String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
      subcategory: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategory',
      },
    quantity : Number,
    discount : Number
})

module.exports = mongoose.model("product",productschema);