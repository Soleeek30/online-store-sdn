const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const basketRouter = require('./routes/basketRouter')

// Импортируем модель Device
const { Device } = require('./models/models')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

// Роутеры
app.use('/api', router)
console.log('✅ Basket routes registered at /api/basket')

// Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		console.log('✅ Database connected')

		// Проверим начальные данные
		const deviceCount = await Device.count()
		console.log(`📦 Total devices in DB: ${deviceCount}`)

		app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`))
	} catch (e) {
		console.log('❌ Server error:', e)
	}
}

start()
