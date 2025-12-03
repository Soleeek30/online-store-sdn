// server/index.js — ФИНАЛЬНЫЙ РАБОЧИЙ ВАРИАНТ
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))

// Логирование всех запросов
app.use((req, res, next) => {
	console.log(`📥 ${req.method} ${req.path}`)
	next()
})

// Подключаем все роуты (БЕЗ тестового роута!)
app.use('/api', router)

// Обработка ошибок — всегда в конце!
app.use(errorHandler)

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		console.log('✅ Database connected')

		const deviceCount = await models.Device.count()
		console.log(`📦 Total devices in DB: ${deviceCount}`)

		app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`))
	} catch (e) {
		console.log('❌ Server error:', e)
	}
}

start()
