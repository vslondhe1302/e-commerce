let express = require("express")
const { userData, deleteUser } = require("../../controllers/admin/userController")

let userRoutes = express.Router()

userRoutes.get("/user-list", userData)
userRoutes.post("/delete-user", deleteUser)

module.exports = {userRoutes}