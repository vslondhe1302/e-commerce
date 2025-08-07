const { materialModel } = require("../../models/materialModel")

let materialInsert = async (req, res) => {
    let { materialName, materialOrder } = req.body
    let obj
    try {
        let insertMaterial = {
            materialName,
            materialOrder,
            materialStatus:true
        }

        let materialRes = await materialModel.insertOne(insertMaterial)
        obj = {
            status: 1,
            msg: "Material Saved Successfully",
            materialRes
        }
        res.send(obj)
    }
    catch (error) {
         if(materialName==''){
            obj = {
                status:0,
                msg : "Please provide Material Name !"
            }
            res.send(obj)
        }
        else if(materialOrder==''){
            obj = {
                status:0,
                msg : "Please provide Material Order !"
            }
            res.send(obj)
        }
        else{
        obj = {
            status: 0,
            msg: "Material already exist !",
        }
        res.send(obj)
    }
    }
}

let materialView = async (req, res) => {
    let {currentPage,limit} = (req.query)
    
    let finalSkip = (currentPage-1)*limit
    
    let searchObj = { }
    if(req.query.materialName!=''){
        // searchObj['materialName'] = new RegExp(req.query.materialName, 'i')            // JS RegExp
        searchObj['materialName'] = {$regex : req.query.materialName, $options:'i'} 
    }
    
    let materialData = await materialModel.find(searchObj).skip(finalSkip).limit(limit)

    let totalRecords = await materialModel.find(searchObj)

   
    let obj = {
        status: 1,
        msg: "material view",
        totalRecords : totalRecords.length,
        pages : Math.ceil(totalRecords.length/limit),
        materialData
    }
    res.send(obj)
}

let singleMaterialView = async (req, res) => {
    let { id } = req.params
    let singleMaterialRes = await materialModel.findOne({ _id: id })
    let obj = {
        status: 1,
        msg: "single material",
        singleMaterialRes
    }
    res.send(obj)
}

// let materialDelete = async (req, res) => {
//     let { id } = req.params

//     let delRes = await materialModel.deleteOne({ _id: id })
//     let obj = {
//         status: 1,
//         msg: "Material Deleted",
//         delRes
//     }
//     res.send(obj)
// }

let materialMultiDelete = async (req, res) => {
    let { ids } = req.body

    let multiDelRes = await materialModel.deleteMany({ _id: ids })
    let obj = {
        status: 1,
        msg: "Material deleted",
        multiDelRes
    }
    res.send(obj)
}

// let changeStatus = async (req,res)=>{
//     let { ids } = req.body

//     let allMaterial = await materialModel.find({ _id: ids }).select('materialStatus')

//     for(let items of allMaterial){
//         await materialModel.updateOne({_id:items._id},{$set:{materialStatus:!items.materialStatus}})
//     }
//     let obj = {
//         status: 1,
//         msg: "Status Changed",
//     }
//     res.send(obj)
// }

let changeStatus = async (req,res)=>{
    let {ids} = req.body

    let statusupdate = await materialModel.updateMany({_id:ids},[{$set:{materialStatus:{$not:"$materialStatus"}}}])
    
     let obj = {
        status: 1,
        msg: "Status Changed",
        statusupdate
    }
    res.send(obj)
}


let materialUpdate = async (req, res) => {
    let { id } = req.params
    let { materialName, materialOrder } = req.body
    let obj
    try {
        let updateMaterial = {
            materialName,
            materialOrder,
            materialStatus:true
        }
        let updateRes = await materialModel.updateOne({ _id: id }, { $set: updateMaterial })
        obj = {
            status: 1,
            msg: "Material Updated Successfully",
            updateRes
        }
        res.send(obj)
    }
    catch (error) {
        obj = {
            status: 0,
            msg: "Material already exist !",
        }
        res.send(obj)
    }
}

module.exports = { materialInsert, materialView, singleMaterialView, materialMultiDelete, changeStatus, materialUpdate }