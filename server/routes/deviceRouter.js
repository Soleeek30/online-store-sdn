// server/routes/deviceRouter.js
const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const authMiddleware = require('../middleware/authMiddleware')

// Логируем все запросы к /device
router.use((req, res, next) => {
	console.log(`🔧 deviceRouter: ${req.method} ${req.path}`)
	next()
})

// Создание устройства (требует авторизации)
router.post('/', authMiddleware, (req, res, next) => {
	console.log('✅ Middleware passed, calling controller...')
	deviceController.create(req, res, next)
})

// Все могут смотреть
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router
