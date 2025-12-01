const { Basket, BasketDevice, Device } = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
    async addToBasket(req, res, next) {
        try {
            const { deviceId } = req.body
            const userId = req.user.id

            let basket = await Basket.findOne({ where: { userId } })
            if (!basket) basket = await Basket.create({ userId })

            let basketDevice = await BasketDevice.findOne({
                where: { basketId: basket.id, deviceId}})

            if (basketDevice) {
                basketDevice.quantity += 1
                await basketDevice.save()
            } else {
                basketDevice = await BasketDevice.create({
                    basketId: basket.id,
                    deviceId,
                    quantity: 1
                })
            }

            const fullBasket = await BasketDevice.findAll({
                where: { basketId: basket.id },
                include: [{ model: Device }]
            })

            return res.json(fullBasket.map(item => ({
                ...item.device.dataValues,
                quantity: item.quantity
            })))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getBasket(req, res) {
        const userId = req.user.id
        const basket = await Basket.findOne({ where: { userId } })
        if (!basket) return res.json([])

        const items = await BasketDevice.findAll({
            where: { basketId: basket.id },
            include: [{ model: Device }]
        })

        return res.json(items.map(item => ({
            ...item.device.dataValues,
            quantity: item.quantity
        })))
    }

    async removeAllFromBasket(req, res) {
        const { deviceId } = req.params
        const userId = req.user.id

        const basket = await Basket.findOne({ where: { userId } })
        await BasketDevice.destroy({ where: { basketId: basket.id, deviceId } })

        const updated = await BasketDevice.findAll({
            where: { basketId: basket.id },
            include: [{ model: Device }]
        })

        return res.json(updated.map(i => ({ ...i.device.dataValues, quantity: i.quantity })))
    }

    async removeOneFromBasket(req, res) {
        const { deviceId } = req.params
        const userId = req.user.id

        const basket = await Basket.findOne({ where: { userId } })
        const item = await BasketDevice.findOne({
            where: { basketId: basket.id, deviceId }
        })

        if (item.quantity > 1) {
            item.quantity -= 1
            await item.save()
        } else {
            await item.destroy()
        }

        const updated = await BasketDevice.findAll({
            where: { basketId: basket.id },
            include: [{ model: Device }]
        })

        return res.json(updated.map(i => ({ ...i.device.dataValues, quantity: i.quantity })))
    }
}

module.exports = new BasketController()