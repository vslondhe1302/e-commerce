let mongoose = require("mongoose")
const { default: slugify } = require("slugify")

let subSubCategorySchema = new mongoose.Schema({

    parentCategory : {type : mongoose.Types.ObjectId, ref:"category"},
    subCategory : {type : mongoose.Types.ObjectId, ref:"subcategory"},
    subSubCategoryName : {
        type : String,
        minLength : 2,
        maxLength : 50,
        required : true
    },
    subSubCategoryImage : String,
    subSubCategoryOrder : {type:Number, required:true},
    subSubCategoryStatus : Boolean,
    slug : String
})

subSubCategorySchema.pre('save', function(next){
    this.slug = slugify(this.subSubCategoryName, {lower : true})
    next()
})

let subSubCategoryModel = mongoose.model("subsubcategory",subSubCategorySchema)
module.exports={subSubCategoryModel}