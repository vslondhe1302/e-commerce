const { orderModel } = require("../../models/orderModel");
const Razorpay = require("razorpay")
const crypto = require("crypto");
const { cartModel } = require("../../models/cartModel");

let instance = new Razorpay({
    key_id: 'rzp_test_WAft3lA6ly3OBc',
    key_secret: '68E17CNWY8SemCvZ6ylOkuOY',
})

let saveOrder = async (req, res) => {
    let { paymentMethod } = (req.body);
    let obj = { ...req.body }

    if (paymentMethod == 1) {     //  Cash On Delivery   //
        obj['orderStatus'] = 'process'

        await orderModel.insertOne(obj)
        await cartModel.deleteMany({userId : obj.userId})

        let resObj = {
            status: 1,
            msg: "Order Saved Successfully !",
            paymentMethod
        }

        res.send(resObj)
    }
    else {                    //  Online  //
        obj['orderStatus'] = 'pending'
        obj['paymentStatus'] = '1'

        let orderData = await orderModel.insertOne(obj)

        let orderObj = {
            "amount": (req.body.orderAmount * 100),
            "currency": "INR",
            "receipt": orderData._id
        }

        let orderRes = await instance.orders.create(orderObj)

        await orderModel.updateOne({ _id: orderData._id }, { $set: { razorpayOrderId: orderRes.id } })
        let resObj = {
            status: 1,
            msg: "Order Saved Successfully !",
            paymentMethod,
            orderRes
        }
        res.send(resObj)
    }
}

let verifyOrder = async (req,res)=>{
    let {razorpay_order_id, razorpay_payment_id, razorpay_signature, userId} = (req.body);

    const hmac = crypto.createHmac('sha256', "68E17CNWY8SemCvZ6ylOkuOY")
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id)
    const generated_signature = hmac.digest('hex')

    if(generated_signature == razorpay_signature){
        
        await orderModel.updateOne({razorpayOrderId : razorpay_order_id},{$set : {
            paymentStatus : "2",
            orderStatus : "2",
            razorpayPayment : razorpay_payment_id,
        }})

    }
    await cartModel.deleteMany({userId : userId})
    
    let resObj = {
            status: 1,
            msg: "Order Verified Successfully !",
        }
    res.send(resObj)
}

let viewOrder = async (req,res) =>{
    let {userId} = req.body
    console.log(userId);
    

    let data = await orderModel.find({userId : userId})

    let resObj = {
            status: 1,
            msg: "Order Data",
            data,
            staticPath : process.env.PRODUCTIMAGEPATH
        }
    res.send(resObj)
}
module.exports = { saveOrder, verifyOrder, viewOrder }