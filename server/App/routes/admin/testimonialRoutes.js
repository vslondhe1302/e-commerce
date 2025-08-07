const express = require("express")
const multer = require("multer")
const { insertTestimonial, viewTestimonial, deleteTestimonial, changeStatus } = require("../../controllers/admin/testimonialController")

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null,'uploads/testimonial')
    },
    filename : function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage : storage})

let testimonialRoutes = express.Router()

testimonialRoutes.post("/add", upload.single("testimonialImage"), insertTestimonial)
testimonialRoutes.get("/view", viewTestimonial)
testimonialRoutes.post("/delete", deleteTestimonial)
testimonialRoutes.post("/change-status", changeStatus)

module.exports = {testimonialRoutes}