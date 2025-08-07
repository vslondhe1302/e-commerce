const { cartModel } = require("../../models/cartModel")

let addToCart = async (req,res)=>{
    let {id,image,color,price,qty,title,userId} = req.body
    let resObj;

    let checkProduct = await cartModel.findOne({productId:id, color, userId}) 
    if(checkProduct){
        resObj = {
            status : 0,
            msg : "Product Already in Cart !!",
        }
        res.send(resObj)
    }
    else{
    let obj = {
        title,
        image,
        color,
        productId : id,
        price,
        qty,
        userId
    }

    let data = await cartModel.insertOne(obj)
    resObj = {
            status : 1,
            msg : "Product Added to Cart Successfully !",
            data
        }
    }

    res.send(resObj)
}

let viewCart = async (req,res) =>{
    let {userId} = req.body

    let data = await cartModel.find({userId}).populate("color", "colorName")
    let obj = {
            status : 1,
            msg : "Product Data",
            staticPath : process.env.PRODUCTIMAGEPATH,
            data
    }

    res.send(obj)
}

let updateCart = async (req,res)=>{
    console.log(req.body);
    

    res.send("resObj")
}

module.exports = {addToCart, viewCart, updateCart}