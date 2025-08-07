let express = require("express")
const { adminLogin, sendOTP, verifyOTP, resetPassword } = require("../../controllers/admin/adminAuthController")

let adminAuthRoutes = express.Router()

adminAuthRoutes.post('/login', adminLogin)
adminAuthRoutes.post('/send-otp',sendOTP)
adminAuthRoutes.post('/verify-otp',verifyOTP)
adminAuthRoutes.post('/reset-password',resetPassword)

module.exports = {adminAuthRoutes}