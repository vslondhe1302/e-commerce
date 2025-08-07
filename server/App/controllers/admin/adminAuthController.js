const { transporter } = require("../../config/mailConfig");
const { adminModel } = require("../../models/adminModel")

let myOTP = new Map()

let adminLogin = async (req, res) => {

    let checkAdmin = await adminModel.findOne(req.body)
    let resObj;
    if (checkAdmin) {
        resObj = {
            status: 1,
            msg: "You are logged in successfully",
            adminId: checkAdmin._id
        }
    }
    else {
        resObj = {
            status: 0,
            msg: "Invalid Email or Password"
        }
    }
    res.send(resObj)
}

let sendOTP = async (req, res) => {
    let { email } = req.body

    let checkEmail = await adminModel.findOne({ adminEmail: email })
    let obj
    if (checkEmail) {
        let otp = Math.floor(Math.random()*99999999).toString().slice(0,6)

        myOTP.set("MYOTP",otp)

            const info = await transporter.sendMail({
                from: '"OTP | Forget Password OTP" <vinodulondhe@gmail.com>',
                to: email,
                subject: "OTP | Forget Password",
                text: "OTP", // plain‑text body
                html: `<b>OTP ${otp}</b>`, // HTML body
            });

        obj = {
            status: 1,
            msg: "OTP sent Successfully"
        }
    }
    else {
        obj = {
            status: 0,
            msg: "Invalid Email Id"
        }
    }
    res.send(obj)
}

let verifyOTP = (req,res) =>{
    let {otp} = req.body

    let backendOtp = myOTP.get("MYOTP")
    if(backendOtp==otp){
        let obj = {
            status : 1,
            msg : "OTP verified successfully"
        }
        res.send(obj)
    }
    else{
         let obj = {
            status : 0,
            msg : "Invalid OTP"
        }
        res.send(obj)
    }
}

let resetPassword = async (req,res) =>{
    let {email,newPassword} = req.body 
    console.log(req.body);
       

    let resetPassword = await adminModel.updateOne({adminEmail:email},{$set : {adminPassword:newPassword}})

    let obj = {
        status : 1,
        msg : "Password reset successfully !"
    }
    res.send(obj)
}

module.exports = { adminLogin, sendOTP,verifyOTP,resetPassword }