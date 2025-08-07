let express = require("express")
const { countryInsert, countryView, singleCountryView, countryMultiDelete, countryUpdate, changeStatus } = require("../../controllers/admin/countryController")

let countryRoutes = express.Router()

countryRoutes.post('/add',countryInsert)
countryRoutes.get('/view',countryView)
countryRoutes.get('/single-row/:id',singleCountryView)
countryRoutes.post('/delete',countryMultiDelete)
countryRoutes.post('/change-status',changeStatus)
countryRoutes.put('/update/:id',countryUpdate)

module.exports={countryRoutes}