const fs = require("fs")
const { categoryModel } = require("../../models/categoryModel")
const { subCategoryModel } = require("../../models/subCategoryModel")
const { subSubCategoryModel } = require("../../models/subSubCategoryModel")
const { materialModel } = require("../../models/materialModel")
const { colorModel } = require("../../models/colorModel")
const { productModel } = require("../../models/productModel")
const path = require("path")


let parentCategory = async (req, res) => {
    let data = await categoryModel.find({ categoryStatus: true }).select("categoryName")
    let obj = {
        status: 1,
        msg: "Parent Category Data",
        data
    }
    res.send(obj)
}

let subCategory = async (req, res) => {
    let { parentId } = req.params
    let data = await subCategoryModel.find({ parentCategory: parentId }, { subCategoryStatus: true }).select("subCategoryName")
    let obj = {
        status: 1,
        msg: "Sub-Category Data",
        data
    }
    res.send(obj)
}

let subSubCategory = async (req, res) => {
    let { subCatId } = req.params
    let data = await subSubCategoryModel.find({ subCategory: subCatId }, { subSubCategoryStatus: true }).select("subSubCategoryName")
    let obj = {
        status: 1,
        msg: "Sub-Sub-Category Data",
        data
    }
    res.send(obj)
}

let materialList = async (req, res) => {
    let data = await materialModel.find({ materialStatus: true }).select("materialName")

    let obj = {
        status: 1,
        msg: "Material List",
        data
    }
    res.send(obj)
}

let colorList = async (req, res) => {
    let data = await colorModel.find({ colorStatus: true }).select("colorName")

    let obj = {
        status: 1,
        msg: "Color List",
        data
    }
    res.send(obj)
}

let productInsert = async (req, res) => {
    let obj = { ...req.body }
    let { productname } = req.params

    if (req.files) {
        if (req.files.productImage) {
            obj['productImage'] = path.join(productname, 'productImage', req.files.productImage[0].filename).replace(/\\/g, '/')
        }
        if (req.files.backImage) {
            obj['backImage'] = path.join(productname, 'backImage', req.files.backImage[0].filename).replace(/\\/g, '/')
        }

        let galleryImages = {}

        if (req.files.brown) {
            galleryImages['brown'] = req.files.brown.map((items) => path.join(productname, "brown", items.filename).replace(/\\/g, '/'))
        }
        if (req.files.honey) {
            galleryImages['honey'] = req.files.honey.map((items) => path.join(productname, "honey", items.filename).replace(/\\/g, '/'))
        }
        obj['galleryImages'] = galleryImages
    }


    let data = await productModel.insertOne(obj)

    let resObj = {
        status: 1,
        msg: "Product Added Successfully !",
        data
    }
    res.send(resObj)
}

let viewProducts = async (req, res) => {
    let data = await productModel.find()
        .populate('parentCategory', 'categoryName')
        .populate('subCategory', 'subCategoryName')
        .populate('subSubCategory', 'subSubCategoryName')
        .populate('productMaterial', 'materialName')
        .populate('productColor', 'colorName')

    let obj = {
        status: 1,
        staticPath: process.env.PRODUCTIMAGEPATH,
        data
    }
    res.send(obj)
}

let singleProduct = async (req, res) => {
    let { id } = req.params

    let data = await productModel.findOne({ _id: id })
        .populate('parentCategory', 'categoryName')
        .populate('subCategory', 'subCategoryName')
        .populate('subSubCategory', 'subSubCategoryName')
        .populate('productMaterial', 'materialName')
        .populate('productColor', 'colorName')

    let obj = {
        status: 1,
        staticPath: process.env.PRODUCTIMAGEPATH,
        data
    }
    res.send(obj)
}

let deleteProduct = async (req, res) => {
    let { id } = req.body
    // let productImages = await productModel.find({ _id: id }).select(["productImage", "backImage", "galleryImages"])
    let slug = await productModel.find({_id : id}).select("slug")
    
    for(let folder of slug){
        let deleteFolder = path.join('uploads/products',folder.slug)

        if(fs.existsSync(deleteFolder)){
        fs.rmSync(deleteFolder,{recursive : true, force : true})
    }
    }

    // for (let v of productImages) {
    //         let deleteProductImg = 'uploads/products/' + v.productImage
    //         fs.unlinkSync(deleteProductImg)

    //         let deleteBackImg = 'uploads/products/' + v.backImage
    //         fs.unlinkSync(deleteBackImg)

    //         let galleryHoney = v.galleryImages.honey
    //         for (let img1 of galleryHoney) {
    //             let deleteGalleryImg1 = 'uploads/products/' + img1
    //             fs.unlinkSync(deleteGalleryImg1)
    //         }

    //         let galleryBrown = v.galleryImages.brown
    //         for (let img2 of galleryBrown) {
    //             let deleteGalleryImg2 = 'uploads/products/' + img2
    //             fs.unlinkSync(deleteGalleryImg2)
    //         }
    // }

    
    await productModel.deleteOne({ _id: id })
    let obj = {
        status: 1,
        msg: "Product Deleted Successfully !"
    }

    res.send(obj)
}

let updateProduct = async (req, res) => {
    let { id } = req.params
    let obj = { ...req.body }

    let productImages = await productModel.find({ _id: id }).select(["productImage", "backImage", "galleryImages"])
    for (let v of productImages) {
        let deleteProductImg = 'uploads/products/' + v.productImage
        fs.unlinkSync(deleteProductImg)

        let deleteBackImg = 'uploads/products/' + v.backImage
        fs.unlinkSync(deleteBackImg)

        for (let galleryImg of v.galleryImages) {
            let deleteGalleryImg = 'uploadss/product/' + galleryImg
            fs.unlinkSync(deleteGalleryImg)
        }
    }

    if (req.files) {
        if (req.files.productImage) {
            obj['productImage'] = req.files.productImage[0].filename
        }
        if (req.files.backImage) {
            obj['backImage'] = req.files.backImage[0].filename
        }

        if (req.files.galleryImage) {
            obj['galleryImage'] = req.files.galleryImage.map((items) => items.filename)
        }
    }

    let data = await productModel.updateOne({ _id: id }, { $set: obj })

    let resObj = {
        status: 1,
        msg: "Product Updated Successfully !",
    }
    res.send(resObj)
}


module.exports = { parentCategory, subCategory, subSubCategory, materialList, colorList, productInsert, viewProducts, singleProduct, deleteProduct, updateProduct }