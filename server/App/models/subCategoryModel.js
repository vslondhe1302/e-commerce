let mongoose = require("mongoose")
const { default: slugify } = require("slugify")

let subCategorySchema = new mongoose.Schema({
    parentCategory : {type : mongoose.Types.ObjectId, ref:"category"},
    subCategoryName : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 30,
    },
    subCategoryImage: String,
    subCategoryOrder : {type : Number, required:true},
    subCategoryStatus : Boolean,
    slug : String
}) 

subCategorySchema.pre('save',function(next){
    this.slug = slugify(this.subCategoryName, {lower : true})
    next()
})

subCategorySchema.virtual('subsubcategories', {
    ref : 'subsubcategory',
    localField : '_id',
    foreignField : 'subCategory'
})

subCategorySchema.set('toJSON', {virtuals : true})

let subCategoryModel = mongoose.model("subcategory",subCategorySchema)
module.exports={subCategoryModel}