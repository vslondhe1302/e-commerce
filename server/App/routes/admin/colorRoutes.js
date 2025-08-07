let express = require("express")
const { colorInsert, colorDelete, colorView, colorMultiDelete, colorUpdate, singleColorView, changeStatus } = require("../../controllers/admin/colorController")
let colorRoutes = express.Router()


colorRoutes.post('/add',colorInsert)
colorRoutes.get('/view',colorView)
colorRoutes.get('/sigle-color-view/:id',singleColorView)
colorRoutes.post('/delete',colorMultiDelete)
colorRoutes.post('/change-status',changeStatus)
colorRoutes.put('/update/:id',colorUpdate)


module.exports={colorRoutes}