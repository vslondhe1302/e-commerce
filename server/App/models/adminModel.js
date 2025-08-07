let mongoose = require("mongoose")

let adminSchema = new mongoose.Schema({
    adminEmail : {
        type : String,
        unique : true,
        required : true,
        minLength : 2,
        maxLength : 80,
    },
    adminPassword : {
        type : String,
        minLength : 5,
        maxLength : 20
    }
})

let adminModel = mongoose.model("admin",adminSchema)

module.exports={adminModel}