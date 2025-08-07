const { categoryModel } = require("../../models/categoryModel");
let fs = require("fs")

let categoryInsert = async (req, res) => {
    let { categoryName, categoryOrder } = (req.body);
    let insertObj
    try {
        insertObj = {
            categoryName,
            categoryOrder,
            categoryStatus: true,
        }
        if (req.file.filename) {
            insertObj['categoryImage'] = req.file.filename
        }

        let categorydata = await categoryModel.insertOne(insertObj)
        let obj = {
            status: 1,
            msg: "Category Saved Successfully",
            categorydata
        }

        res.send(obj)
    }
    catch {
        if (categoryName == '') {
            let obj = {
                status: 0,
                msg: "Provide Category Name !",
            }
            res.send(obj)
        }
        else if (categoryOrder == '') {
            let obj = {
                status: 0,
                msg: "Provide Category Order!",
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
                msg: "Category Already Exist !",
            }
            res.send(obj)
        }
    }
}

let categoryview = async (req, res) => {
    let { currentPage } = req.query
    let limit = 4
    let finalSkip = (currentPage - 1) * limit
    let searchObj = {}

    if (req.query.categoryName != '') {
        searchObj["categoryName"] = { $regex: req.query.categoryName, $options: 'i' }
    }
    let categorydata = await categoryModel.find(searchObj).skip(finalSkip).limit(limit)

    let totalRecords = await categoryModel.find(searchObj)
    let pages = Math.ceil(totalRecords.length / limit)

    let obj = {
        status: 1,
        msg: "Category data viewed",
        totalRecords: totalRecords.length,
        pages,
        staticPath: process.env.CATEGORYIMAGEPATH,
        categorydata
    }

    res.send(obj)
}

let singleCategory = async (req, res) => {
    let { id } = req.params
    let categorydata = await categoryModel.findOne({ _id: id })

    let obj = {
        status: 1,
        msg: "Category Single data viewed",
        staticPath: process.env.CATEGORYIMAGEPATH,
        categorydata
    }

    res.send(obj)
}

let deleteCategory = async (req, res) => {
    let { ids } = req.body

    let selectCategory = await categoryModel.find({ _id: ids }).select('categoryImage')  //for img name

    for (let v of selectCategory) {
        let deletePath = 'uploads/category/'+v.categoryImage
            fs.unlinkSync(deletePath)
    }

    let data = await categoryModel.deleteMany({ _id: ids })
    let obj = {
        status: 1,
        msg: "Category Deleted Successfully !",
        data
    }

    res.send(obj)
}

let changeStatus = async (req, res) => {
    let { ids } = req.body
    let data = await categoryModel.updateMany({ _id: ids }, [{ $set: { categoryStatus: { $not: '$categoryStatus' } } }])
    let obj = {
        status: 1,
        msg: "Status Changed",
        data
    }
    res.send(obj)
}

let categoryUpdate = async (req, res) => {
    let { id } = req.params
    let { categoryName, categoryOrder } = req.body

    try {

        let updateCategory = {
            categoryName,
            categoryOrder,
        }
        let selectCategory = await categoryModel.find({ _id: id }).select('categoryImage')  //for img name

        for (let v of selectCategory) {
            let deletePath = 'uploads/category/' + v.categoryImage
            fs.unlinkSync(deletePath)
        }

        if (req.file.filename) {
            updateCategory['categoryImage'] = req.file.filename
        }

        let updateRes = await categoryModel.updateOne({ _id: id }, { $set: updateCategory })
        let obj = {
            status: 1,
            msg: "category Updated Successfully",
            updateRes
        }
        res.send(obj)
    }
    catch (error) {
        let obj = {
            status: 0,
            msg: "category already exist !",
        }
        res.send(obj)
    }
}



module.exports = { categoryInsert, categoryview, singleCategory, deleteCategory, changeStatus, categoryUpdate }