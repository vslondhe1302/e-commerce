let express = require("express")
const { userAuthRoutes } = require("./userAuthRoutes")
const { homePageRoutes } = require("./homePageRoutes")
const { cartRoutes } = require("./cartRoutes")
const { orderRoutes } = require("./orderRoutes")

let webRoutes = express.Router()

webRoutes.use('/user', userAuthRoutes)
webRoutes.use('/home', homePageRoutes)
webRoutes.use('/cart', cartRoutes)
webRoutes.use('/order', orderRoutes)

module.exports={webRoutes}