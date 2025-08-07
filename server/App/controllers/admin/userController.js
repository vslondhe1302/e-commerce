const { userModel } = require("../../models/userModel")

let userData = async (req,res) =>{
    let data = await userModel.find()

    let obj = {
        status : 1,
        msg : "User List",
        data
    }
    res.send(obj)
}

let deleteUser = async (req,res) =>{
    let {ids} = req.body
    if(ids.length!=0){
    let data = await userModel.deleteMany({_id : ids})

    let obj = {
        status : 1,
        msg : "User Deleted Successfully !",
    }
    res.send(obj)
    }
    else{
       let obj = {
        status : 0,
        msg : "Please select user !",
    }
    res.send(obj) 
    }
}

module.exports = {userData, deleteUser}