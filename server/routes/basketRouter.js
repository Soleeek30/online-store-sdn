// server/routes/basketRouter.js
const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, basketController.addToBasket)

router.get('/', authMiddleware, basketController.getBasket)

router.delete(
	'/:deviceId',
	authMiddleware,
	basketController.removeAllFromBasket
)

router.delete(
	'/:deviceId/one',
	authMiddleware,
	basketController.removeOneFromBasket
)

module.exports = router
