let mongoose = require("mongoose")
const { default: slugify } = require("slugify")

let faqSchema = new mongoose.Schema({
    question : {
        type : String,
        required : true,
        minLength : 3,
    },
    answer : {
        type : String,
        required : true,
        minLength : 3,
    },
    order : Number,
    status : Boolean,
    slug : String
})

faqSchema.pre('save',function(next){
    this.slug = slugify(this.question,{lower : true})
    next()
})

let faqModel = mongoose.model("faq",faqSchema)
module.exports={faqModel}