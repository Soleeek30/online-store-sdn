// server/controllers/basketController.js
const { Basket, BasketDevice, Device } = require('../models/models')
const ApiError = require('../error/ApiError')

const addToBasket = async (req, res, next) => {
	try {
		const { deviceId } = req.body
		const userId = req.user.id

		console.log('📦 Adding to basket:', { userId, deviceId })

		if (!deviceId) {
			return next(ApiError.badRequest('deviceId не указан'))
		}

		// Проверяем, существует ли устройство
		const device = await Device.findByPk(deviceId)
		if (!device) {
			return next(ApiError.badRequest('Устройство не найдено'))
		}

		// Находим или создаем корзину пользователя
		let basket = await Basket.findOne({ where: { userId } })
		if (!basket) {
			basket = await Basket.create({ userId })
			console.log('✅ Created new basket:', basket.id)
		}

		// Ищем элемент в корзине
		let basketDevice = await BasketDevice.findOne({
			where: { basketId: basket.id, deviceId },
		})

		if (basketDevice) {
			// Если элемент уже есть — увеличиваем количество
			basketDevice.quantity = (basketDevice.quantity || 1) + 1
			await basketDevice.save()
			console.log('➕ Increased quantity:', basketDevice.quantity)
		} else {
			// Если элемента нет — создаем новый с quantity = 1
			basketDevice = await BasketDevice.create({
				basketId: basket.id,
				deviceId,
				quantity: 1,
			})
			console.log('✨ Created new basket item')
		}

		// Получаем обновленную корзину
		const basketDevices = await BasketDevice.findAll({
			where: { basketId: basket.id },
			include: [{ model: Device }],
		})

		// ИСПРАВЛЕНО: Преобразуем в нужный формат
		const result = basketDevices
			.filter(item => item.device !== null) // Убираем удалённые товары
			.map(item => ({
				id: item.device.id,
				name: item.device.name,
				price: item.device.price,
				rating: item.device.rating,
				img: item.device.img,
				quantity: item.quantity || 1,
				typeId: item.device.typeId,
				brandId: item.device.brandId,
			}))

		console.log('📋 Returning basket:', result)
		return res.json(result)
	} catch (e) {
		console.error('❌ Error in addToBasket:', e)
		next(ApiError.badRequest(e.message))
	}
}

const getBasket = async (req, res) => {
	try {
		const userId = req.user.id
		console.log('🔍 Getting basket for user:', userId)

		const basket = await Basket.findOne({ where: { userId } })
		if (!basket) {
			console.log('📭 No basket found')
			return res.json([])
		}

		const basketDevices = await BasketDevice.findAll({
			where: { basketId: basket.id },
			include: [{ model: Device }],
		})

		// ИСПРАВЛЕНО: Преобразуем в нужный формат
		const result = basketDevices
			.filter(item => item.device !== null)
			.map(item => ({
				id: item.device.id,
				name: item.device.name,
				price: item.device.price,
				rating: item.device.rating,
				img: item.device.img,
				quantity: item.quantity || 1,
				typeId: item.device.typeId,
				brandId: item.device.brandId,
			}))

		console.log('📋 Basket items:', result.length)
		return res.json(result)
	} catch (e) {
		console.error('❌ Error in getBasket:', e)
		return res.json([])
	}
}

const removeAllFromBasket = async (req, res) => {
	try {
		const { deviceId } = req.params
		const userId = req.user.id

		console.log('🗑️ Removing all of device:', deviceId)

		const basket = await Basket.findOne({ where: { userId } })
		if (!basket) {
			return res.status(404).json({ message: 'Корзина не найдена' })
		}

		await BasketDevice.destroy({
			where: { basketId: basket.id, deviceId },
		})

		const basketDevices = await BasketDevice.findAll({
			where: { basketId: basket.id },
			include: [{ model: Device }],
		})

		// ИСПРАВЛЕНО: Преобразуем в нужный формат
		const result = basketDevices
			.filter(item => item.device !== null)
			.map(item => ({
				id: item.device.id,
				name: item.device.name,
				price: item.device.price,
				rating: item.device.rating,
				img: item.device.img,
				quantity: item.quantity || 1,
				typeId: item.device.typeId,
				brandId: item.device.brandId,
			}))

		console.log('📋 Basket after removal:', result.length)
		return res.json(result)
	} catch (e) {
		console.error('❌ Error in removeAllFromBasket:', e)
		return res.json([])
	}
}

const removeOneFromBasket = async (req, res) => {
	try {
		const { deviceId } = req.params
		const userId = req.user.id

		console.log('➖ Removing one of device:', deviceId)

		const basket = await Basket.findOne({ where: { userId } })
		if (!basket) {
			return res.status(404).json({ message: 'Корзина не найдена' })
		}

		const basketDevice = await BasketDevice.findOne({
			where: { basketId: basket.id, deviceId },
		})

		if (!basketDevice) {
			return res.status(404).json({ message: 'Товар не найден в корзине' })
		}

		const currentQuantity = basketDevice.quantity || 1

		if (currentQuantity > 1) {
			// Уменьшаем количество
			basketDevice.quantity = currentQuantity - 1
			await basketDevice.save()
			console.log('➖ Decreased quantity to:', basketDevice.quantity)
		} else {
			// Удаляем запись, если количество = 1
			await basketDevice.destroy()
			console.log('🗑️ Removed item completely')
		}

		const basketDevices = await BasketDevice.findAll({
			where: { basketId: basket.id },
			include: [{ model: Device }],
		})

		// ИСПРАВЛЕНО: Преобразуем в нужный формат
		const result = basketDevices
			.filter(item => item.device !== null)
			.map(item => ({
				id: item.device.id,
				name: item.device.name,
				price: item.device.price,
				rating: item.device.rating,
				img: item.device.img,
				quantity: item.quantity || 1,
				typeId: item.device.typeId,
				brandId: item.device.brandId,
			}))

		console.log('📋 Basket after removal:', result.length)
		return res.json(result)
	} catch (e) {
		console.error('❌ Error in removeOneFromBasket:', e)
		return res.json([])
	}
}

module.exports = {
	addToBasket,
	getBasket,
	removeAllFromBasket,
	removeOneFromBasket,
}
