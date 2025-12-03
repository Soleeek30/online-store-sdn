// server/routes/deviceRouter.js
const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware') // ← ЭТА СТРОЧКА!

// Создание
router.post('/', authMiddleware, checkRole('ADMIN'), deviceController.create)


// Получение
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

router.delete('/:id', authMiddleware, checkRole('ADMIN'), deviceController.delete)

module.exports = router
