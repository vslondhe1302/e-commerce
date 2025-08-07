let express = require("express")
const { materialInsert, materialView, singleMaterialView, materialMultiDelete, materialUpdate, changeStatus } = require("../../controllers/admin/materialController")
let materialRoutes = express.Router()


materialRoutes.post('/add',materialInsert)
materialRoutes.get('/view',materialView)
materialRoutes.get('/single-row/:id',singleMaterialView)
materialRoutes.post('/delete', materialMultiDelete)
materialRoutes.post('/status-change', changeStatus)
materialRoutes.put('/update/:id',materialUpdate)

module.exports={materialRoutes}