let mongoose = require("mongoose")
const { default: slugify } = require("slugify")

let sliderSchema = new mongoose.Schema({
    sliderTitle : {type : String, required : true,},
    sliderImage : {type : String, required : true},
    sliderOrder : {type : Number, required : true},
    sliderStatus : Boolean,
    slug : String

})

sliderSchema.pre('save',function(next){
    this.slug = slugify(this.sliderTitle,{lower : true})
    next()
})

let sliderModel = mongoose.model("slider", sliderSchema)
module.exports = {sliderModel}