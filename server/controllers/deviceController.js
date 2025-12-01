const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')
const { Where } = require('sequelize/lib/utils')

class DeviceController {
	async create(req, res, next) {
		try {
			let { name, price, brandId, typeId, info } = req.body
			const { img } = req.files

			if (!img) {
				return next(ApiError.badRequest('Не загружено изображение'))
			}

			if (info) {
				info = JSON.parse(info)
				info.forEach(i => {
					DeviceInfo.create({
						title: i.title,
						description: i.description,
						deviceId: device.id	
					})
				});
			}

			const candidate = await Device.findOne({ where: { name } })
			if (candidate) {
				return next(ApiError.badRequest('Товар с таким именем уже существует'))
			}

			let fileName = uuid.v4() + '.jpg'
			await img.mv(path.resolve(__dirname, '..', 'static', fileName))

			const device = await Device.create({
				name,
				price,
				brandId,
				typeId,
				img: fileName,
			})

			return res.json(device)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res) {
		let {brandId, typeId, limit, page} = req.query
		page = page || 1
		limit = limit || 9
		const offset = (page - 1) * limit

		limit = Number(limit)
		page = Number(page)
		brandId = brandId ? Number(brandId) : null
		typeId = typeId ? Number(typeId) : null

		let devices;

		if(!brandId && !typeId) {
			devices = await Device.findAndCountAll({limit, offset})
		}

		if (brandId && !typeId) {
			devices = await Device.findAndCountAll({
				where: { brandId },
				limit,
				offset,
			})
		}

		if (!brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { typeId },
				limit,
				offset,
			})

		}

		if (brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { typeId, brandId },
				limit,
				offset,
			})

		}

		return res.json(devices)
	}

	async getOne(req, res) {
		const {id} = req.params
		const device = await Device.findOne(
			{
				where: {id},
				include: [{model: DeviceInfo, as: 'info'}]
			},
		)
		return res.json(device)
	}
}

module.exports = new DeviceController()
