let mongoose = require("mongoose")
const { default: slugify } = require("slugify")

let productSchema = new mongoose.Schema({
    parentCategory :{type : mongoose.Types.ObjectId, ref : "category"},
    subCategory : {type : mongoose.Types.ObjectId, ref : "subcategory"},
    subSubCategory : {type : mongoose.Types.ObjectId, ref : "subsubcategory"},
    productMaterial : [{type : mongoose.Types.ObjectId, ref : "material"}],
    productColor : [{type : mongoose.Types.ObjectId, ref : "color"}],
    productType : {
        type : String,
        enum : ['1','2','3']
    },
    isBestSelling : Boolean,
    isTopRated : Boolean,
    isUpsell : Boolean,
    actualPrice : String,
    salePrice : String,
    totalStock : Number,
    productDimensions : String,
    productBrand : String,
    productFinish : String,
    productWarranty : String,
    productShipIn : String,
    productCode : String,

    productName : {
        type : String,
        required : true,
    },
    productImage : String,
    backImage : String,
    galleryImages : {
        honey : [String],
        brown : [String]
    },
    productDescription : String,
    productOrder : {type : Number, required : true},
    productStatus : Boolean,
    slug : String
})

productSchema.pre('save',function(next){
    this.slug = slugify(this.productName,{lower : true})
    next()
})

let productModel = mongoose.model("product",productSchema)
module.exports = {productModel}