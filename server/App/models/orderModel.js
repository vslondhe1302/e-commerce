let mongoose = require("mongoose")
let orderSchema = new mongoose.Schema({
    orderItems : [],
    shippingAddress : {type : Object},

    paymentMethod : {
        type : String,
        enum : ["1","2"],   // 1-Cash on delivery 2-online
        default : "1"
    },

    paymentStatus : {
        type : String,
        enum : ["1","2","3"],   // 1 pending, 2 success, 3 cancel
        default : 1
    },

    razorpayOrderId : String,
    razorpayPayment : String,  // razorpayPaymentId
    orderAmount : Number,
    orderQty : Number,
    shippingCharges : Number,
    orderStatus : {
        type : String,
        enum : ["pending", "process", "completed"], // pending, after order place = process, admin changes = completed
        default : "pending"
    },
    orderUser : {type : mongoose.Types.ObjectId, ref : "user"},
    userId : String

},{timestamps : true}
)

let orderModel = mongoose.model('order', orderSchema)
module.exports = {orderModel}