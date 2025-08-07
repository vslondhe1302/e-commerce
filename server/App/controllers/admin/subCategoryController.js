const { categoryModel } = require("../../models/categoryModel")
const { subCategoryModel } = require("../../models/subCategoryModel")
let fs = require('fs')

let subCategoryInsert = async (req, res) => {
    let { subCategoryName, subCategoryOrder, parentCategory } = req.body

    let insertObj;
    try {
        insertObj = {
            parentCategory,
            subCategoryName,
            subCategoryOrder,
            subCategoryStatus: true,
        }
        if (req.file.filename) {
            insertObj["subCategoryImage"] = req.file.filename
        }

        let subCategorydata = await subCategoryModel.insertOne(insertObj)

        let obj = {
            status: 1,
            msg: "Sub-Category Saved Successfully !",
            subCategorydata
        }

        res.send(obj)
    }
    catch(error) {
        if (parentCategory == '') {
            let obj = {
                status: 0,
                msg: "Provide Parent category !",
            }
            res.send(obj)
        }
        else if (subCategoryName == '') {
            let obj = {
                status: 0,
                msg: "Provide subCategory Name !",
            }
            res.send(obj)
        }
        else if (subCategoryOrder == '') {
            let obj = {
                status: 0,
                msg: "Provide subCategory Order!",
            }
            res.send(obj)
        }
        else if (!req.file) {
            let obj = {
                status: 0,
                msg: "Provide Image!",
            }
            res.send(obj)
        }
        else {
            let obj = {
                status: 0,
                msg:error,
            }
            res.send(obj)
        }
    }
}

let parentCategory = async (req, res) => {
    let parentData = await categoryModel.find({ categoryStatus: true }).select("categoryName")
    let obj = {
        status: 1,
        msg: "Parent-Category Data",
        parentData
    }
    res.send(obj)
}

let subCategoryView = async (req, res) => {
    let { subCategoryName, currentPage } = req.query
    let searchObj = {}
    let limit = 4
    let finalSkip = (currentPage - 1) * limit

    if (subCategoryName != '') {
        searchObj["subCategoryName"] = { $regex: subCategoryName, $options: 'i' }
    }

    let data = await subCategoryModel.find(searchObj).populate("parentCategory", 'categoryName').skip(finalSkip).limit(limit)
    let totalRecords = await subCategoryModel.find(searchObj)

    let obj = {
        status: 1,
        msg: "Sub-Category Data Viewed",
        totalRecords: totalRecords.length,
        pages: Math.ceil(totalRecords.length / limit),
        staticPath: process.env.SUBCATEGORYIMAGEPATH,
        data

    }
    res.send(obj)
}

let singleDataView = async (req, res) => {
    let { id } = req.params

    let singleData = await subCategoryModel.findOne({ _id: id }).populate("parentCategory", 'categoryName')

    let obj = {
        status: 1,
        msg: "Single Data View",
        staticPath: process.env.SUBCATEGORYIMAGEPATH,
        singleData
    }
    res.send(obj)
}

let subCategoryDelete = async (req, res) => {
    let { ids } = req.body

    if(ids.length!=0){
    let subCategory = await subCategoryModel.find({ _id: ids }).select("subCategoryImage")

    for (let v of subCategory) {
        deletePath = 'uploads/sub-category/' + v.subCategoryImage
        fs.unlinkSync(deletePath)
    }

    let deleteRes = await subCategoryModel.deleteMany({ _id: ids })
    let obj = {
        status: 1,
        msg: "Sub-Category Deleted Successfully",
        deleteRes

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

let statusChange = async (req, res) => {
    let { ids } = req.body

    let statusUpdate = await subCategoryModel.updateMany({ _id: ids }, [{ $set: { subCategoryStatus: { $not: "$subCategoryStatus" } } }])
    let obj = {
        status: 1,
        msg: "Status Changed Successfully",
        statusUpdate

    }
    res.send(obj)
}

let updateSubCategory = async (req, res) => {
    let { subCategoryName, subCategoryOrder, parentCategory } = req.body
    let { id } = req.params
    try {

        let subCategory = await subCategoryModel.find({ _id: id }).select("subCategoryImage")

        for (let v of subCategory) {
            if (v.subCategoryImage) {
                let deletePath = 'uploads/sub-category/' + v.subCategoryImage
                fs.unlinkSync(deletePath)
            }
        }

        let updateObj = {
            subCategoryName,
            subCategoryOrder,
            parentCategory
        }
        if (req.file.filename) {
            updateObj['subCategoryImage'] = req.file.filename
        }

        let updateData = await subCategoryModel.updateOne({ _id: id }, { $set: updateObj })
        let obj = {
            status: 1,
            msg: "Sub-Category Updated Successfully !",
            updateData
        }
        res.send(obj)
    }
    catch(error) {
        if (subCategoryName == '') {
            let obj = {
                status: 0,
                msg: "Provide subCategory Name !",
            }
            res.send(obj)
        }
        else if (subCategoryOrder == '') {
            let obj = {
                status: 0,
                msg: "Provide subCategory Order!",
            }
            res.send(obj)
        }
        else if (!req.file) {
            let obj = {
                status: 0,
                msg: "Provide Image!",
            }
            res.send(obj)
        }
        else if (parentCategory == '') {
            let obj = {
                status: 0,
                msg: "Provide ParentCategory !",
            }
            res.send(obj)
        }
        else {
            let obj = {
                status: 0,
                msg:error ,
            }
            res.send(obj)
        }
    }
}

module.exports = { subCategoryInsert, parentCategory, subCategoryView, singleDataView, subCategoryDelete, statusChange, updateSubCategory }