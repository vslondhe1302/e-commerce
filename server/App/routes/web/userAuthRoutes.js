let express = require("express")
const { register, login, changePassword, userData, updateProfile, googleLogin, facebookLogin } = require("../../controllers/web/userAuthController")

let multer = require("multer")
const { checkToken } = require("../../middleware/checkToken")
let uploads = multer()

let userAuthRoutes = express.Router()

userAuthRoutes.post('/register',uploads.none(), register)
userAuthRoutes.post('/login',uploads.none(), login)
userAuthRoutes.post('/change-password', checkToken, changePassword)
userAuthRoutes.post('/data', checkToken, userData)
userAuthRoutes.put('/update-profile', checkToken, updateProfile)
userAuthRoutes.post('/google-login', googleLogin)
userAuthRoutes.post('/facebook-login', facebookLogin)

module.exports={userAuthRoutes}