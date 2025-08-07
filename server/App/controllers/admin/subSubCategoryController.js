const fs = require('fs')
const { categoryModel } = require("../../models/categoryModel")
const { subCategoryModel } = require("../../models/subCategoryModel")
const { subSubCategoryModel } = require("../../models/subSubCategoryModel")

let parentCategory = async (req, res) => {
    let parentData = await categoryModel.find({ categoryStatus: true }).select("categoryName")
    let obj = {
        status: 1,
        msg: "Parent Category Data",
        parentData
    }

    res.send(obj)
}

let subCategory = async (req, res) => {
    let { parentId } = req.params
    let data = await subCategoryModel.find({ parentCategory: parentId }, { subCategoryStatus: true }).select("subCategoryName")
    let obj = {
        status: 1,
        msg: "Sub-Category Data",
        data
    }
    res.send(obj)
}

let subSubCategoryInsert = async (req, res) => {
    let { subSubCategoryName, subSubCategoryOrder, parentCategory, subCategory } = req.body
    try {
        let insertObj = {
            subSubCategoryName,
            subSubCategoryOrder,
            parentCategory,
            subCategory,
            subSubCategoryStatus: true
        }

        if (req.file.filename) {
            insertObj['subSubCategoryImage'] = req.file.filename
        }
        console.log(insertObj);

        let data = await subSubCategoryModel.insertOne(insertObj)
        let obj = {
            status: 1,
            msg: "Sub-Sub-Category Added Successfully !",
            data
        }
        res.send(obj)

    }
    catch {
        if (subSubCategoryName == '') {
            let obj = {
                status: 0,
                msg: "Provide Sub-Sub-Category Name !",
            }
            res.send(obj)
        }
        else if (subSubCategoryOrder == '') {
            let obj = {
                status: 0,
                msg: "Provide Sub-Sub-Category Order!",
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
                msg: "Sub-Sub-Category Already Exist !",
            }
            res.send(obj)
        }
    }
}

let subSubCategoryView = async (req, res) => {
    let limit = 4;
    let currentPage = req.query.currentPage

    let searchObj = {}

    let finalSkip = (currentPage-1)*limit
    
    if(req.query.subSubCategoryName!=''){
        searchObj['subSubCategoryName'] = {$regex : req.query.subSubCategoryName, $options:'i'} 
    }

    let data = await subSubCategoryModel.find(searchObj)
    .populate('parentCategory', 'categoryName')
    .populate('subCategory', 'subCategoryName')
    .skip(finalSkip).limit(limit)

    let totalRecords = await subSubCategoryModel.find(searchObj)    

    let obj = {
        status: 1,
        msg: "Sub-Sub-Category Viewed !",
        totalRecords : totalRecords.length,
        pages : Math.ceil(totalRecords.length/limit),
        staticPath: process.env.SUBSUBCATEGORYIMAGEPATH,
        data
    }
    res.send(obj)
}

let deleteSubsubCategory = async (req, res) => {
    let { ids } = req.body

    let subSubCategory = await subSubCategoryModel.find({ _id: ids }).select("subSubCategoryImage")

    for (let v of subSubCategory) {
        if (v.subSubCategoryImage) {
            let deletePath = 'uploads/sub-sub-category/' + v.subSubCategoryImage
            fs.unlinkSync(deletePath)
        }
    }

    let deleteRes = await subSubCategoryModel.deleteMany({ _id: ids })
    let obj = {
        status: 1,
        msg: "Sub-Sub-Category Deleted Successfully !",
        deleteRes
    }
    res.send(obj)
}

let changeStatus = async (req, res) => {
    let { ids } = req.body

    let statusUpdate = await subSubCategoryModel.updateMany({ _id: ids }, [{ $set: { subSubCategoryStatus: { $not: "$subSubCategoryStatus" } } }])
    let obj = {
        status: 1,
        msg: "Status Changed Successfully !",

    }
    res.send(obj)
}

let singleDataView = async (req, res) => {
    let { id } = req.params

    let data = await subSubCategoryModel.findOne({ _id: id }).populate("parentCategory", "categoryName").populate("subCategory", "subCategoryName")

    let obj = {
        status: 1,
        msg: " Single Data",
        staticPath: process.env.SUBSUBCATEGORYIMAGEPATH,
        data
    }
    res.send(obj)
}

let updateSubsubCategory = async (req, res) => {
    let { id } = req.params
    let { subSubCategoryName, subSubCategoryOrder, parentCategory, subCategory } = req.body
    try {

        let subSubCategory = await subSubCategoryModel.find({ _id: id }).select("subSubCategoryImage")

        for (let v of subSubCategory) {
            if (v.subSubCategoryImage) {
                let deletePath = 'uploads/sub-sub-category/'+v.subSubCategoryImage
                fs.unlinkSync(deletePath)
            }
        }
        let updateObj = {
            subSubCategoryName,
            subSubCategoryOrder,
            parentCategory,
            subCategory,
            subSubCategoryStatus: true
        }

        if (req.file.filename) {
            updateObj['subSubCategoryImage'] = req.file.filename
        }

        let data = await subSubCategoryModel.updateOne({ _id: id },{ $set: updateObj })

        let obj = {
            status: 1,
            msg: "Sub-Sub-Category Updated Successfully !",
            data
        }
        res.send(obj)
    }

    catch(error) {
        if (parentCategory == '') {
            let obj = {
                status: 0,
                msg: "Provide Parent Category !",
            }
            res.send(obj)
        }
        else if (subCategory == '') {
            let obj = {
                status: 0,
                msg: "Provide Sub-Category Name !",
            }
            res.send(obj)
        }
        else if (subSubCategoryName == '') {
            let obj = {
                status: 0,
                msg: "Provide Sub-Sub-Category Name !",
            }
            res.send(obj)
        }
        else if (subSubCategoryOrder == '') {
            let obj = {
                status: 0,
                msg: "Provide Sub-Sub-Category Order!",
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
                msg: error,
            }
            res.send(obj)
        }
    }
}

module.exports = { parentCategory, subCategory, subSubCategoryInsert, subSubCategoryView, deleteSubsubCategory, changeStatus, singleDataView, updateSubsubCategory }