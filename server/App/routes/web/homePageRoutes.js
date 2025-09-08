let express = require("express")
const { sliderData, productData, megaMenu, singleProductDetails, materialList, colorList, productListingData, topRatedProducts, bestSellingData, testimonialData } = require("../../controllers/web/homePageController")
let homePageRoutes = express.Router()

homePageRoutes.get("/slider",sliderData)
homePageRoutes.get("/products",productData)
homePageRoutes.get("/mega-menu",megaMenu)
homePageRoutes.get("/single-product/:slug",singleProductDetails)
homePageRoutes.get("/material-list",materialList)
homePageRoutes.get("/color-list",colorList)
homePageRoutes.post("/product-listing",productListingData)
homePageRoutes.get("/top-rated",topRatedProducts)
homePageRoutes.get("/best-selling",bestSellingData)
homePageRoutes.get("/testimonial-data",testimonialData)

module.exports = {homePageRoutes}