const fs = require("fs");
const { testimonialModel } = require("../../models/testimonialModel");

let insertTestimonial = async (req, res) => {
    let {testimonialName,testimonialDesignation,testimonialRating,testimonialOrder,testimonialMessage,testimonialStatus } = (req.body);
    try{
    let insertObj = {
        testimonialName,
        testimonialDesignation,
        testimonialRating,
        testimonialOrder,
        testimonialMessage,
        testimonialStatus : true
    }

    if(req.file){
        insertObj["testimonialImage"] = req.file.filename
    }

    let data = await testimonialModel.insertOne(insertObj)

    let obj = {
        status : 1,
        msg : "Testimonial Data Added Successfully !"
    }
    res.send(obj)
}
catch(error){
    let obj = {
        status : 0,
        msg : error
    }
    res.send(obj)
     
}
}


let viewTestimonial = async (req,res) =>{
    let data = await testimonialModel.find()

    let obj = {
        status : 1,
        msg : "Testimonial Data",
        staticPath : process.env.TESTIMONIALIMAGEPATH,
        data
    }
    res.send(obj)

}

let deleteTestimonial = async (req,res) =>{
    let {ids} = req.body
    console.log(ids);
    
    
    if(ids.length!=0){
          
    let testimonial = await testimonialModel.find({ _id: ids }).select("testimonialImage")

    for (let v of testimonial) {
        let deletePath = 'uploads/testimonial/' + v.testimonialImage
        fs.unlinkSync(deletePath)
    }
    
    let data = await testimonialModel.deleteMany({_id : ids})
    
    let obj = {
        status : 1,
        msg : "Testimonial Deleted Successfully !",
    }
    res.send(obj)
    }
    else{
        let obj = {
        status : 0,
        msg : "No items selected !",
    }
    res.send(obj)
    }
}

let changeStatus = async (req,res) =>{
    let {ids} = req.body

    if(ids.length!=0){
        let data = await testimonialModel.updateMany({_id : ids},[{$set : {testimonialStatus : {$not : "$testimonialStatus"}}}])
        let obj = {
        status : 1,
        msg : "Status Changed Successfully !",
    }
    res.send(obj)
    }
    else{
        let obj = {
        status : 0,
        msg : "No items selected !",
    }
    res.send(obj)
    }
}
module.exports = { insertTestimonial, viewTestimonial, deleteTestimonial, changeStatus  }