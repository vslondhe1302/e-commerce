const jwt = require("jsonwebtoken")

let checkToken = (req,res,next) =>{
    try{
    let token = (req.headers.authorization).split(" ")[1]

    let decoded = jwt.verify(token, process.env.TOKENKEY) // token verify

    req.body.userId = decoded.id
    next()
    
    }
    catch(error){
        console.log(error);
        res.send('Check Token')
    }
}

module.exports={checkToken}