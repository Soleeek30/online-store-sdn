const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')

const create = async (req, res, next) => {
	const { name } = req.body
	if (!name) {
		return next(ApiError.badRequest('Имя бренда не может быть пустым'))
	}
	const brand = await Brand.create({ name })
	return res.json(brand)
}

const getAll = async (req, res) => {
	const brands = await Brand.findAll()
	return res.json(brands)
}

module.exports = {
	create,
	getAll,
}
