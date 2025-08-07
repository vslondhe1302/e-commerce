let express = require("express")
let multer = require("multer")
const { subCategoryInsert, parentCategory, subCategoryView, subCategoryDelete, statusChange, singleDataView, updateSubCategory } = require("../../controllers/admin/subCategoryController")

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null,'uploads/sub-category')
    },
    filename : function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage : storage})

let subCategoryRoutes = express.Router()

subCategoryRoutes.post("/add", upload.single("subCategoryImage"),subCategoryInsert)
subCategoryRoutes.get("/parent-category",parentCategory)
subCategoryRoutes.get("/view",subCategoryView)
subCategoryRoutes.post("/delete",subCategoryDelete)
subCategoryRoutes.post("/status-change",statusChange)
subCategoryRoutes.get("/single-data/:id",singleDataView)
subCategoryRoutes.put("/update/:id",upload.single('subCategoryImage'),updateSubCategory)


module.exports={subCategoryRoutes}