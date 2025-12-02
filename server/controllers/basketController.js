// server/controllers/basketController.js
const { Basket, BasketDevice, Device } = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
	async addToBasket(req, res, next) {
		try {
			const { deviceId } = req.body
			const userId = req.user.id

			console.log('📦 Adding to basket:', { userId, deviceId })

			// Находим или создаем корзину
			let basket = await Basket.findOne({ where: { userId } })
			if (!basket) {
				basket = await Basket.create({ userId })
				console.log('✅ Created new basket:', basket.id)
			}

			// Находим существующую запись
			let basketDevice = await BasketDevice.findOne({
				where: { basketId: basket.id, deviceId },
			})

			if (basketDevice) {
				// Увеличиваем количество
				basketDevice.quantity = (basketDevice.quantity || 1) + 1
				await basketDevice.save()
				console.log('➕ Increased quantity:', basketDevice.quantity)
			} else {
				// Создаем новую запись с quantity = 1
				basketDevice = await BasketDevice.create({
					basketId: basket.id,
					deviceId,
					quantity: 1,
				})
				console.log('✨ Created new basket item')
			}

			// Получаем полную корзину
			const fullBasket = await BasketDevice.findAll({
				where: { basketId: basket.id },
				include: [{ model: Device }],
			})

			const result = fullBasket.map(item => ({
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

	async getBasket(req, res) {
		try {
			const userId = req.user.id
			console.log('🔍 Getting basket for user:', userId)

			const basket = await Basket.findOne({ where: { userId } })
			if (!basket) {
				console.log('📭 No basket found')
				return res.json([])
			}

			const items = await BasketDevice.findAll({
				where: { basketId: basket.id },
				include: [{ model: Device }],
			})

			const result = items.map(item => ({
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

	async removeAllFromBasket(req, res) {
		try {
			const { deviceId } = req.params
			const userId = req.user.id

			console.log('🗑️ Removing all of device:', deviceId)

			const basket = await Basket.findOne({ where: { userId } })
			if (!basket) return res.json([])

			await BasketDevice.destroy({
				where: { basketId: basket.id, deviceId },
			})

			const updated = await BasketDevice.findAll({
				where: { basketId: basket.id },
				include: [{ model: Device }],
			})

			const result = updated.map(item => ({
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

	async removeOneFromBasket(req, res) {
		try {
			const { deviceId } = req.params
			const userId = req.user.id

			console.log('➖ Removing one of device:', deviceId)

			const basket = await Basket.findOne({ where: { userId } })
			if (!basket) return res.json([])

			const item = await BasketDevice.findOne({
				where: { basketId: basket.id, deviceId },
			})

			if (!item) {
				console.log('⚠️ Item not found in basket')
				return res.json([])
			}

			const currentQuantity = item.quantity || 1

			if (currentQuantity > 1) {
				// Уменьшаем количество
				item.quantity = currentQuantity - 1
				await item.save()
				console.log('➖ Decreased quantity to:', item.quantity)
			} else {
				// Удаляем полностью
				await item.destroy()
				console.log('🗑️ Removed item completely')
			}

			const updated = await BasketDevice.findAll({
				where: { basketId: basket.id },
				include: [{ model: Device }],
			})

			const result = updated.map(i => ({
				id: i.device.id,
				name: i.device.name,
				price: i.device.price,
				rating: i.device.rating,
				img: i.device.img,
				quantity: i.quantity || 1,
				typeId: i.device.typeId,
				brandId: i.device.brandId,
			}))

			console.log('📋 Basket after removal:', result.length)
			return res.json(result)
		} catch (e) {
			console.error('❌ Error in removeOneFromBasket:', e)
			return res.json([])
		}
	}
}

module.exports = new BasketController()
