let mongoose = require("mongoose")
const { default: slugify } = require("slugify")

let colorSchema = new mongoose.Schema({
    colorName : {
        type : String,
        unique : true,
        required : true,
        minLength : 3,
        maxLength : 20,
    },
    colorCode : {
        type:String,
        required : true,
    },

    colorOrder : {type:Number,min:1,max:100},
    colorStatus : Boolean,
    slug : String
})

colorSchema.pre('save',function(next){
    this.slug = slugify(this.colorName,{lower : true})
    next()
})

let colorModel = mongoose.model("color",colorSchema)
module.exports={colorModel}