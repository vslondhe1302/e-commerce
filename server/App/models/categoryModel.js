let mongoose = require("mongoose")
const { default: slugify } = require("slugify")

let categorySchema = new mongoose.Schema({
    categoryName : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 24
    },
    categoryImage:String,
    categoryOrder : {type:Number,required:true},
    categoryStatus : Boolean,
    slug : String
}) 

categorySchema.pre('save',function(next){
    this.slug = slugify(this.categoryName,{lower : true})
    next()
})

categorySchema.virtual('subcategories',{
    ref : 'subcategory',
    localField : '_id',
    foreignField : 'parentCategory'
})

categorySchema.set('toJSON', {virtuals : true})

let categoryModel = mongoose.model("category",categorySchema)
module.exports={categoryModel}