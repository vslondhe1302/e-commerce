const { userModel } = require("../../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const saltRounds = 10;

let register = async (req, res) => {

    let { name, email, phone, password } = req.body

    const hashPassword = bcrypt.hashSync(password, saltRounds)
    let obj;
    try {
        let insertObj = {
            userName: name,
            userEmail: email,
            userPhone: phone,
            userPassword: hashPassword
        }
        let data = await userModel.insertOne(insertObj)
        obj = {
            status: 1,
            msg: "Registration Successful !",
            data

        }
        res.send(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            msg: "Email Id already exist !",
        }
        res.send(obj)
    }
}

let login = async (req, res) => {
    let { email, password } = req.body

    let obj;
    let checkEmail = await userModel.findOne({ userEmail: email })
    if (checkEmail) {
        let dbPassword = checkEmail.userPassword

        if (bcrypt.compareSync(password, dbPassword)) {
            let user = {
                userName: checkEmail.userName,
                id: checkEmail._id
            }

            let token = jwt.sign(user, process.env.TOKENKEY)   //token generate

            obj = {
                status: 1,
                msg: "Login success !",
                user,
                token
            }
        }
        else {
            obj = {
                status: 0,
                msg: "Wrong Password ?"
            }
        }
    }
    else {
        obj = {
            status: 0,
            msg: 'Invalid Email Id'
        }
    }
    res.send(obj)
}

let changePassword = async (req, res) => {
    let { oldPassword, newPassword, confirmPassword, userId } = req.body
    let resObj;
    let userData = await userModel.findOne({ _id: userId })
    let dbPassword = userData.userPassword

    if (bcrypt.compareSync(oldPassword, dbPassword)) {
        if (newPassword == confirmPassword) {
            let hashPassword = bcrypt.hashSync(newPassword, saltRounds)
            await userModel.updateOne({ _id: userId }, { $set: { userPassword: hashPassword } })

            resObj = {
                status: 0,
                msg: "Password changed successfully !"
            }
        }
        else {
            resObj = {
                status: 0,
                msg: "New password and confirm password not matched !"
            }
        }
    }
    else {
        resObj = {
            status: 0,
            msg: "Wrong Current Password !"
        }
    }
    res.send(resObj)
}

let userData = async (req, res) => {
    let { userId } = req.body

    let user = await userModel.find({ _id: userId })

    let resObj = {
        status: 1,
        user
    }
    res.send(resObj)
}

let updateProfile = async (req, res) => {
    let { name,address,gender, userId} = req.body
    console.log(userId);
    
    let obj;
    try {
        let updateObj = {
            userName: name,
            userAddress : address,
            userGender : gender
           
        }

        let data = await userModel.updateOne({ _id: userId },{ $set:updateObj })
        obj = {
            status: 1,
            msg: "Profile Updated Successfuly !",
            data
        }
    }
    catch {
        obj = {
            status: 0,
            msg: "Please fill required fields !"
        }
    }

    res.send(obj)
}

let googleLogin = async (req,res) =>{
    let {name,email,phone} = req.body
    console.log(req.body);
    
    
    let myRes;
    let checkEmail = await userModel.findOne({ userEmail: email })
    if(checkEmail){
        let user = {
            userName : checkEmail.userName,
            id : checkEmail._id
        }

        let token = jwt.sign(user, process.env.TOKENKEY)
        myRes = {
            status : 1,
            msg : "Login Success",
            user,
            token
        }
    }
    else{
        let insertObj = {
            userName : name,
            userEmail : email,
            userPhone : phone
        }

        let myUser = await userModel.insertOne(insertObj)
        let user = {
            userName : myUser.userName,
            id : myUser._id
        }

        let token = jwt.sign(user, process.env.TOKENKEY)
        myRes = {
            status : 1,
            msg : "Login Success",
            user,
            token
        }
    }

    res.send(myRes)
    
}

let facebookLogin = async (req,res) =>{
    let {name,email,phone} = req.body
    
    let myRes;
    let checkPhone = await userModel.findOne({ userPhone: phone })
    if(checkPhone){
        let user = {
            userName : checkPhone.userName,
            id : checkPhone._id
        }

        let token = jwt.sign(user, process.env.TOKENKEY)
        myRes = {
            status : 1,
            msg : "Login Success",
            user,
            token
        }
    }
    else{
        let insertObj = {
            userName : name,
            userEmail : email,
            userPhone : phone
        }

        let myUser = await userModel.insertOne(insertObj)
        let user = {
            userName : myUser.userName,
            id : myUser._id
        }

        let token = jwt.sign(user, process.env.TOKENKEY)
        myRes = {
            status : 1,
            msg : "Login Success",
            user,
            token
        }
    }

    res.send(myRes)
    
}

module.exports = { register, login, changePassword, userData, updateProfile, googleLogin, facebookLogin}