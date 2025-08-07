const { orderModel } = require("../../models/orderModel")

let ordersData = async (req,res) =>{
    let data = await orderModel.find()

    let obj = {
        status : 1,
        msg : "Orders Data",
        data
    }
    res.send(obj)
}

let deleteOrder = async (req,res) =>{
    let {ids} = req.body
    if(ids.length!=0){

    let data = await orderModel.deleteMany({_id : ids})

    let obj = {
        status : 1,
        msg : "Orders Deleted Successfully !",
    }
    res.send(obj)
    }
    else{
        let obj = {
            status : 0,
            msg : "No items are selected !",
        }
        res.send(obj)
    }
}

module.exports = {ordersData, deleteOrder}