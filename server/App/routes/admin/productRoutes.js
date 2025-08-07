const express = require("express")
const fs = require("fs")
const multer = require("multer")
const { parentCategory, subCategory, subSubCategory, materialList, colorList, productInsert, viewProducts, singleProduct, deleteProduct, updateProduct } = require("../../controllers/admin/productController")
const path = require("path")

let storage = multer.diskStorage({
    destination : function(req,file,cb){
        const baseDir = 'uploads/products'
        const color = file.fieldname;
        const {productname} = req.params ||'default'
        
        const folderPath = path.join(baseDir,productname,color);
        
        // make sure folder is exist (create if not)
        fs.mkdirSync(folderPath,{recursive : true})
        
        // tell multer to save here
        cb(null,folderPath)
    },
    filename : function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage : storage})



let productRoutes = express.Router()

productRoutes.get("/parent-category",parentCategory)
productRoutes.get("/sub-category/:parentId",subCategory)
productRoutes.get("/sub-sub-category/:subCatId",subSubCategory)
productRoutes.get("/material-list",materialList)
productRoutes.get("/color-list",colorList)

productRoutes.post("/add/:productname", upload.fields(
    [
        {name : 'productImage', maxCount : 1},
        {name : 'backImage', maxCount : 1},
        {name : 'honey', maxCount : 10},
        {name : 'brown', maxCount : 10},

    ]
),productInsert)
productRoutes.get("/view",viewProducts)
productRoutes.get("/view/:id",singleProduct)
productRoutes.post("/delete",deleteProduct)
productRoutes.put("/update/:id", upload.fields(
    [
        {name : 'productImage', maxCount : 1},
        {name : 'backImage', maxCount : 1},
        {name : 'honey', maxCount : 10},
        {name : 'brown', maxCount : 10},
    ]
),updateProduct)

module.exports={productRoutes}