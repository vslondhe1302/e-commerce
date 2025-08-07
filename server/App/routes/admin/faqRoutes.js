let express = require("express")
const { faqInsert, faqView, singlefaqView, faqMultiDelete, faqUpdate, changeStatus } = require("../../controllers/admin/faqController")

let faqRoutes = express.Router()

faqRoutes.post('/add',faqInsert)
faqRoutes.get('/view',faqView)
faqRoutes.get('/single-faq/:id',singlefaqView)
faqRoutes.post('/delete',faqMultiDelete)
faqRoutes.post('/change-status',changeStatus)
faqRoutes.put('/update/:id',faqUpdate)

module.exports={faqRoutes}