let mongoose = require("mongoose")
const { default: slugify } = require("slugify")

let countrySchema = new mongoose.Schema({
    countryName : {
        type : String,
        unique : true,
        required : true,
        minLength : 2,
        maxLength : 20,
    },
    countryOrder :{type:Number, required:true},
    countryStatus : Boolean,
    slug : String
})

countrySchema.pre('save',function(next){
    this.slug = slugify(this.countryName,{lower : true})
    next()
})

let countryModel = mongoose.model("country",countrySchema)
module.exports={countryModel}