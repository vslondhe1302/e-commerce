let express = require("express")
let mongoose = require("mongoose")
const path = require("path")
let cors = require("cors")
const { adminRoutes } = require("./App/routes/admin/adminRoutes")
const { webRoutes } = require("./App/routes/web/webRoutes")
const { adminModel } = require("./App/models/adminModel")

let app = express()
app.use(cors())
app.use(express.json())

require("dotenv").config()
app.use("/admin",adminRoutes)
app.use("/web",webRoutes)

app.use("/uploads/category", express.static("uploads/category"))
app.use("/uploads/sub-category", express.static("uploads/sub-category"))
app.use("/uploads/sub-sub-category", express.static("uploads/sub-sub-category"))
app.use("/uploads/products", express.static(path.join(__dirname,"uploads/products")))
app.use("/uploads/slider", express.static("uploads/slider"))
app.use("/uploads/testimonial", express.static("uploads/testimonial"))


mongoose.connect('mongodb://127.0.0.1:27017/ecomfurniture')
.then(async (res)=>{ 
    
    let checkAdmin = await adminModel.find()
    if(checkAdmin.length==0){
        adminModel.insertOne({
            adminEmail : process.env.ADMINEMAIL,
            adminPassword : process.env.ADMINPASSWORD
        })
    }
    app.listen(process.env.PORT)  //http://localhost:8000/
})
