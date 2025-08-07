let express = require("express")
let multer = require("multer")
// let upload = multer({dest:'uploads/category'})  //half control
const storage = multer.diskStorage({              //full control
    destination : function(req,file,cb){
        return cb(null,'uploads/category')
    },
    filename : function(req,file,cb){
        cb (null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage:storage})

const { categoryInsert, categoryview, deleteCategory, changeStatus, singleCategory, categoryUpdate } = require("../../controllers/admin/categoryController")
let categoryRoutes = express.Router()

categoryRoutes.post("/add", upload.single('categoryImage'),categoryInsert)
categoryRoutes.get("/view", categoryview)
categoryRoutes.get("/single-data/:id", singleCategory)
categoryRoutes.post("/delete", deleteCategory)
categoryRoutes.post("/status-change", changeStatus)
categoryRoutes.put("/update/:id",  upload.single('categoryImage'), categoryUpdate)

module.exports={categoryRoutes}