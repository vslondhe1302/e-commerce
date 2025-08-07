const { faqModel } = require("../../models/faqModel")

let faqInsert = async (req, res) => {
    let { question, answer, order } = req.body
    let insertfaq = {
        question,
        answer,
        order,
        status: true
    }
    let faqres = await faqModel.insertOne(insertfaq)
    let obj = {
        status: 1,
        msg: "FAQ Saved",
        faqres
    }
    res.send(obj)
}

let faqView = async (req, res) => {
    let {currentPage} = req.query
    let limit = 4
    let finalSkip = (currentPage-1)*limit

    let faqRes = await faqModel.find().skip(0).limit(limit)
    let totalRecords = await faqModel.find()
    let obj = {
        status: 1,
        msg: "faq viewed",
        totalRecords : totalRecords.length,
        pages : Math.ceil(totalRecords.length/limit),
        faqRes
    }
    res.send(obj)
}

let singlefaqView = async (req, res) => {
    let { id } = req.params
    let singleRes = await faqModel.findOne({ _id:id })
    let obj = {
        status: 1,
        msg: "Single faq viewed",
        singleRes
    }
    res.send(obj)
}

// let faqDelete = async (req, res) => {
//     let { id } = req.params

//     let delRes = await faqModel.deleteOne({ _id: id })
//     let obj = {
//         status: 1,
//         msg: " FAQ Deleted",
//         delRes
//     }

//     res.send(obj)
// }

let faqMultiDelete = async (req, res) => {
    let { ids } = req.body

    let delMultiRes = await faqModel.deleteMany({ _id: ids })
    let obj = {
        status: 1,
        msg: "FAQ's Deleted",
        delMultiRes
    }

    res.send(obj)
}

let changeStatus = async (req,res)=>{
    let {ids} = req.body
    let allFaqs = await faqModel.find({_id:ids}).select('status')
     
    for(let item of allFaqs){
        await faqModel.updateOne({_id:item._id}, {$set:{status:!item.status}})
    }
    let obj = {
        status: 1,
        msg: "FAQ's Status Changed",
    }

    res.send(obj)
}

let faqUpdate = async (req, res) => {
    let { id } = req.params

    let { question, answer, order } = req.body
    let updatefaq = {
        question,
        answer,
        order,
        status:true
    }
    let updateRes = await faqModel.updateOne({ _id: id }, { $set: updatefaq })

    let obj = {
        status: 1,
        msg: "FAQ Updated",
        updateRes
    }
    res.send(obj)
}

module.exports = { faqInsert, faqView, singlefaqView, faqMultiDelete,changeStatus, faqUpdate }