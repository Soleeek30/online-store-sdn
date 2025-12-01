const { Sequelize } = require('sequelize')
require('dotenv').config()

module.exports = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		dialect: 'postgres',
		host: process.env.DB_HOST, // ← localhost
		port: process.env.DB_PORT, // ← 5432 (или 5001, как сейчас)
	}
)
