// server/routes/index.js
const Router = require('express')
const router = new Router()

const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require('./basketRouter') // ← ЭТО ДОЛЖНО БЫТЬ!

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter) // ← ЭТО САМОЕ ГЛАВНОЕ!

module.exports = router
