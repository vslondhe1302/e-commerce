let mongoose = require("mongoose")
const { default: slugify } = require("slugify")

let testimonialSchema = new mongoose.Schema({

    testimonialName : String,
    testimonialImage : String,
    testimonialDesignation : String,
    testimonialRating : Number,
    testimonialOrder : Number,
    testimonialMessage : String,
    testimonialStatus : Boolean,
    // slug : String
})

// testimonialSchema.pre('save', function(next){
//     this.slug = slugify(this.testimonialName, {lower : true})
//     next()
// })

let testimonialModel = mongoose.model("testimonial",testimonialSchema)
module.exports={testimonialModel}