let mongoose = require("mongoose")
let userSchema = new mongoose.Schema({
    userName : String,
    userEmail : {
        type : String,
        unique : true,
        required : true,
    },
    userPhone : {
        type : String,
    },
    userPassword : String,
    userAddress : String,
    userGender : String
},{
    timestamps : true
})

let userModel = mongoose.model("user",userSchema)
module.exports={userModel}