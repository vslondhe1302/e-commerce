const { colorModel } = require("../../models/colorModel")

let colorInsert = async (req, res) => {
    let { colorName, colorCode, colorOrder } = req.body
    let obj
    try {
        let insertObj = {
            colorName,
            colorCode,
            colorStatus:true,
            colorOrder
        }
        let insertRes = await colorModel.insertOne(insertObj)
        obj = {
            status: 1,
            msg: "Color Saved Successfully",
            insertRes
        }
        res.send(obj)
    }
    catch (error) {
        if(colorCode==''){
            obj = {
                status:0,
                msg : "Please provide Color Code"
            }
            res.send(obj)
        }
        else if(colorName==''){
            obj = {
                status:0,
                msg : "Please provide Color Name"
            }
            res.send(obj)
        }
        else{
        obj = {
            status: 0,
            msg: "Color already Exist !",
        }
        res.send(obj)
    }
    }
}

let colorView = async (req, res) => {
    let {colorName, currentPage} = req.query
    let searchObj = {}
    let limit = 4
    let finalSkip = (currentPage-1)*limit
    if(colorName!=''){
        searchObj['colorName'] = {$regex : colorName, $options : 'i'}
    }
    // if(req.query.colorCode!=''){
    //     searchObj['colorCode'] = new RegExp(req.query.colorCode, 'i')
    // }
    
    let colorRes = await colorModel.find(searchObj).skip(finalSkip).limit(limit)
    let totalRecords = await colorModel.find(searchObj)

    let obj = {
        status: 1,
        msg: "Color View",
        totalRecords : totalRecords.length,
        pages : Math.ceil(totalRecords.length/limit),
        colorRes
    }
    res.send(obj)
}

let singleColorView = async (req, res) => {
    let { id } = req.params
    let singleColor = await colorModel.findOne({ _id: id })
    let obj = {
        status: 1,
        msg: "Single Color View",
        singleColor
    }
    res.send(obj)
}

// let colorDelete = async (req, res) => {
//     let { id } = req.params
//     let delRes = await colorModel.deleteOne({ _id: id })
//     let obj = {
//         status: 1,
//         msg: "Color Deleted",
//         delRes
//     }
//     res.send(obj)
// }

let colorMultiDelete = async (req, res) => {
    let { ids } = req.body

    let MultidelRes = await colorModel.deleteMany({ _id: ids })
    let obj = {
        status: 1,
        msg: "Colors deleted",
        MultidelRes
    }
    res.send(obj)
}

// let changeStatus = async (req,res)=>{
//     let { ids } = req.body

//     let allColors = await colorModel.find({ _id: ids }).select('colorStatus')

//     for(let items of allColors){
//         await colorModel.updateOne({_id:items._id},{$set:{colorStatus:!items.colorStatus}})
//     }
//     let obj = {
//         status: 1,
//         msg: "Status Changed",
//     }
//     res.send(obj)

// }

let changeStatus = async (req,res) =>{
    let {ids} = req.body

    let statusUpdate = await colorModel.updateMany({_id:ids},[{$set:{colorStatus:{$not:"$colorStatus"}}}])
    let obj = {
        status: 1,
        msg: "Status Changed",
        statusUpdate
    }
    res.send(obj)
}

let colorUpdate = async (req, res) => {
    let { id } = req.params
    let { colorName, colorCode, colorOrder } = req.body
    let obj
    try {
        let updateObj = {
            colorName,
            colorCode,
            colorStatus:true,
            colorOrder
        }
        let updateRes = await colorModel.updateOne({ _id: id }, { $set: updateObj })
        obj = {
            status: 1,
            msg: "Colors Updated Successfully",
            updateRes
        }
        res.send(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            msg: "Color already Exist !",
        }
        res.send(obj)
    }
}

module.exports = { colorInsert, colorView, colorMultiDelete,changeStatus, colorUpdate, singleColorView }