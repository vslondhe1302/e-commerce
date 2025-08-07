let mongoose = require("mongoose")

let cartSchema = new mongoose.Schema({
    title : String,
    image: String,
    price : String,
    qty : Number,
    color : {type : mongoose.Types.ObjectId, ref:"color"},
    userId : {type : mongoose.Types.ObjectId, ref:"user"},
    productId : {type : mongoose.Types.ObjectId, ref:"product"},
}) 

let cartModel = mongoose.model("cart",cartSchema)
module.exports={cartModel}