// server/middleware/checkRoleMiddleware.js
const ApiError = require('../error/ApiError')

module.exports = function (requiredRole) {
	return function (req, res, next) {
		if (req.method === 'OPTIONS') {
			next()
		}

		try {
			if (!req.user || req.user.role !== requiredRole) {
				return next(ApiError.forbidden('Доступ запрещён: недостаточно прав'))
			}
			next()
		} catch (e) {
			next(ApiError.forbidden('Ошибка проверки роли'))
		}
	}
}
