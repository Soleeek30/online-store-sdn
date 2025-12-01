const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')

const generateJwt = (id, email, role) => {
	console.log('🎫 Generating JWT with:', { id, email, role })
	const token = jwt.sign({ id: id, email, role }, process.env.SECRET_KEY, {
		expiresIn: '24h',
	})
	console.log('🎫 Generated token:', token)
	return token
}

class UserController {
	async registration(req, res, next) {
		const { email, password, role } = req.body

		if (!email || !password) {
			return next(ApiError.badRequest('Некорректный email или password'))
		}

		const candidate = await User.findOne({ where: { email } })
		if (candidate) {
			return next(
				ApiError.badRequest('Пользователь с таким email уже существует')
			)
		}

		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({ email, role, password: hashPassword })
		await Basket.create({ userId: user.id })

		const token = generateJwt(user.id, user.email, user.role)

		return res.json({ token })
	}

	async login(req, res, next) {
		const { email, password } = req.body
		console.log('🔐 Login request for:', email)

		const user = await User.findOne({ where: { email } })
		if (!user) {
			console.log('❌ User not found:', email)
			return next(ApiError.internal('Пользователь с таким именем не найден'))
		}

		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			console.log('❌ Wrong password for:', email)
			return next(ApiError.internal('Указан неверный пароль'))
		}

		console.log('✅ Login successful for user:', user.id, user.email)
		const token = generateJwt(user.id, user.email, user.role)

		return res.json({ token })
	}

	async check(req, res, next) {
		const token = generateJwt(req.user.id, req.user.email, req.user.role)
		return res.json({ token })
	}
}

module.exports = new UserController()
