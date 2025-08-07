let express = require("express")
const { checkToken } = require("../../middleware/checkToken")
const { addToCart, viewCart, updateCart } = require("../../controllers/web/cartController")

let cartRoutes = express.Router()

cartRoutes.post('/add-to-cart',checkToken, addToCart)
cartRoutes.post('/view-cart',checkToken, viewCart)
cartRoutes.put('/update-cart',checkToken, updateCart)

module.exports = {cartRoutes}