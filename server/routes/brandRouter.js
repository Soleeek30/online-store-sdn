const Router = require('express').Router()
const brandController = require('../controllers/brandController')

Router.post('/', brandController.create)
Router.get('/', brandController.getAll)

module.exports = Router
