let express = require("express")
const { ordersData, deleteOrder } = require("../../controllers/admin/ordersController")

let ordersRoutes = express.Router()

ordersRoutes.get("/view-orders", ordersData)
ordersRoutes.post("/delete", deleteOrder)

module.exports = {ordersRoutes}