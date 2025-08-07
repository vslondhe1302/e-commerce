let express = require("express")
let multer = require("multer")
const { sliderInsert, viewSlider, deleteSlider, changeStatus, singleDataView, sliderUpdate } = require("../../controllers/admin/sliderController")

const storage = multer.diskStorage({
    destination : function (req,file,cb){
        return cb(null, "uploads/slider")
    },
    filename : function (req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage : storage})

let sliderRoutes = express.Router()

sliderRoutes.post("/add", upload.single('sliderImage'), sliderInsert)
sliderRoutes.get("/view", viewSlider)
sliderRoutes.post("/delete", deleteSlider)
sliderRoutes.post("/change-status", changeStatus)
sliderRoutes.get("/single-data/:id", singleDataView)
sliderRoutes.put("/update/:id",upload.single('sliderImage'), sliderUpdate)

module.exports = {sliderRoutes}