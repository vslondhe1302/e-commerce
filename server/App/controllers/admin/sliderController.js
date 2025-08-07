const { sliderModel } = require("../../models/sliderModel")
const fs = require("fs")

let sliderInsert = async (req, res) => {
    let { sliderTitle, sliderOrder } = req.body
    console.log(sliderTitle, sliderOrder);

    try {
        let insertObj = {
            sliderTitle,
            sliderOrder,
            sliderStatus: true
        }
        if (req.file.filename) {
            insertObj["sliderImage"] = req.file.filename
        }

        let data = await sliderModel.insertOne(insertObj)
        let obj = {
            status: 1,
            msg: "Slider Added Successfully !",
            data
        }
        res.send(obj)
    }
    catch (error) {
        if (sliderTitle == '') {
            let obj = {
                status: 0,
                msg: "Provide Slider Title"
            }
            res.send(obj)
        }
        else if (sliderOrder == '') {
            let obj = {
                status: 0,
                msg: "Provide Slider Order"
            }
            res.send(obj)
        }
        else if (!req.file) {
            let obj = {
                status: 0,
                msg: "Provide Image"
            }
            res.send(obj)
        }
        else {
            let obj = {
                status: 0,
                msg: error
            }
            res.send(obj)
        }
    }
}

let viewSlider = async (req, res) => {
    let { sliderTitle, currentPage } = req.query
    let searchObj = {}
    let limit = 4
    let finalSkip = (currentPage - 1) * limit

    if (sliderTitle != '') {
        searchObj["sliderTitle"] = { $regex: sliderTitle, $options: 'i' }
    }

    let data = await sliderModel.find(searchObj).skip(finalSkip).limit(limit)
    let totalRecords = await sliderModel.find(searchObj)

    let obj = {
        status: 1,
        staticPath : process.env.SLIDERIMAGEPATH,
        totalRecords : totalRecords.length,
        pages : Math.ceil(totalRecords.length/limit),
        msg: "Slider Data",
        data
    }
    res.send(obj)
}

let deleteSlider = async (req,res)=>{
    let {ids} = req.body
    
    let sliderData = await sliderModel.find({_id : ids}).select("sliderImage")

    for(let v of sliderData){
       let deletePath = "uploads/slider/"+v.sliderImage
       fs.unlinkSync(deletePath)
    }
    let data = await sliderModel.deleteMany({_id:ids})
    let obj = {
        status: 1,
        msg: "Slider Deleted Successfully !",
    }
    res.send(obj)
}

let changeStatus = async (req,res) =>{
    let {ids} = req.body

    let data = await sliderModel.updateMany({_id : ids},[{$set : {sliderStatus : {$not : "$sliderStatus"}}}])
     let obj = {
        status: 1,
        msg: "Status Changed Successfully !",
    }
    res.send(obj)
}

let singleDataView = async (req, res) => {
    let { id } = req.params

    let data = await sliderModel.findOne({ _id: id })

    let obj = {
        status: 1,
        msg: "Single Data View",
        staticPath: process.env.SLIDERIMAGEPATH,
        data
    }
    res.send(obj)
}


let sliderUpdate = async (req, res) => {
    let {id} = req.params
    let { sliderTitle, sliderOrder } = req.body

    try {
        let sliderData = await sliderModel.find({_id : id}).select('sliderImage')
        for(let v of sliderData){
            let deletePath = "uploads/slider/"+v.sliderImage
            fs.unlinkSync(deletePath)
        }
        let updateObj = {
            sliderTitle,
            sliderOrder,
            sliderStatus: true
        }
        if (req.file.filename) {
            updateObj["sliderImage"] = req.file.filename
        }

        let data = await sliderModel.updateOne({_id : id},{$set : updateObj})
        let obj = {
            status: 1,
            msg: "Slider Updated Successfully !",
            data
        }
        res.send(obj)
    }
    catch (error) {
        if (sliderTitle == '') {
            let obj = {
                status: 0,
                msg: "Provide Slider Title"
            }
            res.send(obj)
        }
        else if (sliderOrder == '') {
            let obj = {
                status: 0,
                msg: "Provide Slider Order"
            }
            res.send(obj)
        }
        else if (!req.file) {
            let obj = {
                status: 0,
                msg: "Provide Image"
            }
            res.send(obj)
        }
        else {
            let obj = {
                status: 0,
                msg: error
            }
            res.send(obj)
        }
    }
}

module.exports = { sliderInsert, viewSlider, deleteSlider, changeStatus, singleDataView, sliderUpdate }