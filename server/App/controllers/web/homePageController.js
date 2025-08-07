const { testimonialModel } = require("../../models/testimonialModel")
const { categoryModel } = require("../../models/categoryModel")
const { colorModel } = require("../../models/colorModel")
const { materialModel } = require("../../models/materialModel")
const { productModel } = require("../../models/productModel")
const { sliderModel } = require("../../models/sliderModel")
const { subSubCategoryModel } = require("../../models/subSubCategoryModel")
const { subSubCategory } = require("../admin/productController")

let megaMenu = async (req,res) =>{
    let data = await categoryModel.find().select(['categoryName', 'slug'])
    .populate({
        path : 'subcategories',
        select : ['subCategoryName', 'slug'],
        populate : {path : 'subsubcategories', select : ['subSubCategoryName', 'slug']}
    })
    let obj = {
        status : 1,
        msg : "category data",
        data
    }

    res.send(obj)
}

let sliderData = async (req,res)=>{
    let data = await sliderModel.find()
    
    let obj = {
        status : 1,
        msg : "Slider data",
        staticPath : process.env.SLIDERIMAGEPATH,
        data
    }

    res.send(obj)

}

let productData = async (req,res) =>{
    console.log(req.query.query);

    let productType = req.query.productType ?? 1
    let data = await productModel.find({productType : productType})    
    .populate('parentCategory','categoryName')
    .populate('subCategory','subCategoryName')
    .populate('subSubCategory','subSubCategoryName')
    .populate('productMaterial','materialName')
    .populate('productColor','colorName')

     let obj = {
        status : 1,
        msg : "Products data",
        staticPath : process.env.PRODUCTIMAGEPATH,
        data
    }

    res.send(obj) 
}

let singleProductDetails = async(req,res) =>{
    let {slug} = req.params
    console.log(req.params);

    let data = await productModel.findOne({slug : slug})    
    .populate('parentCategory','categoryName')
    .populate('subCategory','subCategoryName')
    .populate('subSubCategory','subSubCategoryName')
    .populate('productMaterial','materialName')
    .populate('productColor','colorName')

    let obj = {
        status : 1,
        msg : "Single Product details",
        staticPath : process.env.PRODUCTIMAGEPATH,
        data
    }

    res.send(obj)
}

let materialList = async (req,res) =>{
    let data = await materialModel.find({materialStatus : true})

    let obj = {
        status : 1,
        msg : "Material List",
        data
    }
    res.send(obj)

}

let colorList = async (req,res) =>{
    let data = await colorModel.find({colorStatus : true})

    let obj = {
        status : 1,
        msg : "color List",
        data
    }
    res.send(obj)
}

let productListingData = async (req,res) =>{
    let {slug} = req.query
    console.log(req.query);
    
    let subSubCategoryId = await subSubCategoryModel.find({slug : slug},{subSubCategoryStatus : true}).select("_id")    

    let data = await productModel.find({subSubCategory : subSubCategoryId})    
    .populate('subSubCategory','subSubCategoryName')

    let obj = {
        status : 1,
        msg : "Product listing data",
        staticPath : process.env.PRODUCTIMAGEPATH,
        data
    }

    res.send(obj) 
}

let topRatedProducts = async (req,res) =>{
    let data = await productModel.find({isTopRated : true})
    .populate('subSubCategory','subSubCategoryName')
    .select(["productName","actualPrice","salePrice","productImage","slug"])

    let obj = {
        status : 1,
        msg : "Top Rated products",
        staticPath : process.env.PRODUCTIMAGEPATH,
        data
    }

    res.send(obj)

}

let bestSellingData = async (req,res) =>{
    let data = await productModel.find({isBestSelling : true})
    .populate('subSubCategory','subSubCategoryName')
    .select(["productName","actualPrice","salePrice","productImage","slug"])

    let obj = {
        status : 1,
        msg : "Best Selling products",
        staticPath : process.env.PRODUCTIMAGEPATH,
        data
    }
    res.send(obj)
}

let testimonialData = async (req,res) =>{
    let data = await testimonialModel.find({testimonialStatus : true})

    let obj = {
        status : 1,
        msg : "Testimonial Data",
        staticPath : process.env.TESTIMONIALIMAGEPATH,
        data
    }
    res.send(obj)

}


module.exports = {megaMenu, sliderData, productData, singleProductDetails, materialList, colorList, productListingData, topRatedProducts, bestSellingData, testimonialData}