let mongoose = require("mongoose")
const { default: slugify } = require("slugify")

let materialSchema = new mongoose.Schema({
    materialName : {
        type : String,
        unique : true,
        required : true,
        minLength : 2,
        maxLength : 24
    },
    materialOrder : {type:Number, required:true},
    materialStatus : Boolean,
    slug : String
}) 

materialSchema.pre('save',function(next){
    this.slug = slugify(this.materialName,{lower : true})
    next()
})

let materialModel = mongoose.model("material",materialSchema)
module.exports={materialModel}