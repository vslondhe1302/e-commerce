let express = require("express")
const { colorRoutes } = require("./colorRoutes")
const { materialRoutes } = require("./materialRoutes")
const { countryRoutes } = require("./countryRoutes")
const { faqRoutes } = require("./faqRoutes")
const { categoryRoutes } = require("./categoryRoutes")
const { subCategoryRoutes } = require("./subCategoryRoutes")
const { subSubCategoryRoutes } = require("./subSubCategoryRoutes")
const { productRoutes } = require("./productRoutes")
const { adminAuthRoutes } = require("./adminAuthRoutes")
const { sliderRoutes } = require("./sliderRoutes")
const { testimonialRoutes } = require("./testimonialRoutes")
const { ordersRoutes } = require("./ordersRoutes")
const { userRoutes } = require("./userRoutes")

let adminRoutes = express.Router()

adminRoutes.use("/auth",adminAuthRoutes)

adminRoutes.use("/color", colorRoutes)
adminRoutes.use("/material", materialRoutes)
adminRoutes.use("/country", countryRoutes)
adminRoutes.use("/faq", faqRoutes)
adminRoutes.use("/category",categoryRoutes)
adminRoutes.use("/sub-category",subCategoryRoutes)
adminRoutes.use("/sub-sub-category",subSubCategoryRoutes)
adminRoutes.use("/product",productRoutes)
adminRoutes.use("/slider",sliderRoutes)
adminRoutes.use("/testimonial", testimonialRoutes)
adminRoutes.use("/orders",ordersRoutes)
adminRoutes.use("/user",userRoutes)


module.exports={adminRoutes}