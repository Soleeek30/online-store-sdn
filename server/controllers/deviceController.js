const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
	async create(req, res, next) {
		try {
			console.log('📦 Creating device...')
			console.log('Body:', req.body)
			console.log('Files:', req.files)

			let { name, price, brandId, typeId, info } = req.body
			const { img } = req.files || {}

			if (!img) {
				console.error('❌ No image provided')
				return next(ApiError.badRequest('Не загружено изображение'))
			}

			// Проверяем, существует ли уже такой товар
			const candidate = await Device.findOne({ where: { name } })
			if (candidate) {
				console.error('❌ Device with this name already exists')
				return next(ApiError.badRequest('Товар с таким именем уже существует'))
			}

			// Генерируем уникальное имя файла
			let fileName = uuid.v4() + '.jpg'
			const filePath = path.resolve(__dirname, '..', 'static', fileName)

			console.log('💾 Saving image to:', filePath)
			await img.mv(filePath)

			// Создаем устройство
			const device = await Device.create({
				name,
				price,
				brandId,
				typeId,
				img: fileName,
			})

			console.log('✅ Device created:', device.id)

			// Добавляем характеристики ПОСЛЕ создания устройства
			if (info) {
				try {
					info = typeof info === 'string' ? JSON.parse(info) : info
					console.log('📝 Adding device info:', info)

					if (Array.isArray(info)) {
						for (const i of info) {
							await DeviceInfo.create({
								title: i.title,
								description: i.description,
								deviceId: device.id, // ← ТЕПЕРЬ device уже существует!
							})
						}
					}
				} catch (e) {
					console.error('⚠️ Error adding device info:', e.message)
					// Не останавливаем создание товара, если не удалось добавить характеристики
				}
			}

			console.log('✅ Device created successfully')
			return res.json(device)
		} catch (e) {
			console.error('❌ Error in create:', e)
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res) {
		try {
			let { brandId, typeId, limit, page } = req.query
			page = page || 1
			limit = limit || 9
			const offset = (page - 1) * limit

			limit = Number(limit)
			page = Number(page)
			brandId = brandId ? Number(brandId) : null
			typeId = typeId ? Number(typeId) : null

			let devices

			if (!brandId && !typeId) {
				devices = await Device.findAndCountAll({ limit, offset })
			} else if (brandId && !typeId) {
				devices = await Device.findAndCountAll({
					where: { brandId },
					limit,
					offset,
				})
			} else if (!brandId && typeId) {
				devices = await Device.findAndCountAll({
					where: { typeId },
					limit,
					offset,
				})
			} else {
				devices = await Device.findAndCountAll({
					where: { typeId, brandId },
					limit,
					offset,
				})
			}

			return res.json(devices)
		} catch (e) {
			console.error('❌ Error in getAll:', e)
			return res.status(500).json({ message: e.message })
		}
	}

	async getOne(req, res) {
		try {
			const { id } = req.params
			const device = await Device.findOne({
				where: { id },
				include: [{ model: DeviceInfo, as: 'info' }],
			})

			if (!device) {
				return res.status(404).json({ message: 'Устройство не найдено' })
			}

			return res.json(device)
		} catch (e) {
			console.error('❌ Error in getOne:', e)
			return res.status(500).json({ message: e.message })
		}
	}
}

module.exports = new DeviceController()
