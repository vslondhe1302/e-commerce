let express = require("express")
let multer = require("multer")
const { subSubCategoryInsert, parentCategory, subCategory, subSubCategoryView, deleteSubsubCategory, changeStatus, updateSubsubCategory, singleDataView } = require("../../controllers/admin/subSubCategoryController")

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null, 'uploads/sub-sub-category')
    },
    filename : function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage : storage})

let subSubCategoryRoutes = express.Router()

subSubCategoryRoutes.post("/add", upload.single('subSubCategoryImage'), subSubCategoryInsert)
subSubCategoryRoutes.get("/parent-category",parentCategory)
subSubCategoryRoutes.get("/sub-category/:parentId",subCategory)
subSubCategoryRoutes.get("/view",subSubCategoryView)
subSubCategoryRoutes.post("/delete",deleteSubsubCategory)
subSubCategoryRoutes.post("/status-change",changeStatus)
subSubCategoryRoutes.get("/view/:id",singleDataView)
subSubCategoryRoutes.put("/edit/:id", upload.single('subSubCategoryImage'),updateSubsubCategory)

module.exports={subSubCategoryRoutes}