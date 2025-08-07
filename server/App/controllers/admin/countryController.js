const { countryModel } = require("../../models/countryModel")

let countryInsert = async(req,res)=>{
let {countryName,countryOrder} = req.body
let obj
try{
    let insertCountry = {
        countryName,
        countryOrder,
        countryStatus:true
    }
    let countryRes = await countryModel.insertOne(insertCountry)
    obj = {
        status : 1,
        msg : "Country Saved Successfully !",
        countryRes
    }
    res.send(obj)
}
catch(error){
    if(countryName==''){
            obj = {
                status:0,
                msg : "Please provide Country Name !"
            }
            res.send(obj)
        }
        else if(countryOrder==''){
            obj = {
                status:0,
                msg : "Please provide Country Order !"
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

let countryView = async (req,res)=>{
    let {countryName, currentPage} = req.query
    let searchObj = {}
    let limit = 4
    let finalSkip = (currentPage-1)*limit
    
    if(countryName!=''){
        searchObj['countryName'] = {$regex : countryName, $options : 'i'}
    }
    let countryData = await countryModel.find(searchObj).skip(finalSkip).limit(limit)
    let totalRecords = await countryModel.find(searchObj)
    let obj = {
        status : 1,
        msg : "Country viewed",
        totalRecords : totalRecords.length,
        pages : Math.ceil((totalRecords.length)/limit),
        countryData
    }
    res.send(obj)
}

let singleCountryView = async (req,res)=>{
    let {id} = req.params
    let singleRes = await countryModel.findOne({ _id:id})
    let obj = {
        status : 1,
        msg : "Single Country viewed",
        singleRes
    }
    res.send(obj)
}

// let countryDelete = async (req,res)=>{
//     let {id} = req.params

//     let delRes = await countryModel.deleteOne({_id:id})
//     let obj = {
//         status : 1,
//         msg : "Country deleted",
//         delRes
//     }

//     res.send(obj)
// }

let countryMultiDelete = async (req,res)=>{
    let {ids} = req.body

    let delMultiRes = await countryModel.deleteMany({_id:ids})
    let obj = {
        status : 1,
        msg : "Country Deleted !",
        delMultiRes
    }

    res.send(obj)
}

// let changeStatus = async (req,res)=>{
//     let {ids} = req.body
    
//     let allCountry = await countryModel.find({_id:ids}).select('countryStatus')

//     for(let items of allCountry){
//         await countryModel.updateOne({_id:items._id},{$set:{countryStatus:!items.countryStatus}})
//     }
    
//     let obj = {
//         status: 1,
//         msg: "Status Changed",
//     }
//     res.send(obj)
// }

let changeStatus = async (req,res) =>{
    let {ids} = req.body

    await countryModel.updateMany({_id:ids},[{$set:{countryStatus:{$not:"$countryStatus"}}}])
    let obj = {
        status: 1,
        msg: "Status Changed",
    }
    res.send(obj)
}

let countryUpdate = async (req,res)=>{
    let {id} = req.params

    let {countryName,countryOrder} = req.body
    let obj
    try{
    let updateCountry = {
        countryName,
        countryOrder,
        countryStatus:true
    }
    let updateRes = await countryModel.updateOne({_id:id},{$set:updateCountry})

    let obj = {
        status : 1,
        msg : "Country Updated Successfully !",
        updateRes
    }
    res.send(obj)
}
catch(error){
   obj = {
        status : 0,
        msg : "Country Name already Exist !"
    }
    res.send(obj) 
}
}

module.exports={countryInsert,countryView,singleCountryView,countryMultiDelete,changeStatus,countryUpdate}