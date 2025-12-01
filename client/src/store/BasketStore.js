// src/store/BasketStore.js
import { makeAutoObservable } from 'mobx'
import { $authHost } from '../http'

class BasketStore {
	constructor() {
		this._basket = []
		makeAutoObservable(this)
	}

	setBasket(basket) {
		this._basket = basket
	}

	get basket() {
		return this._basket
	}

	get totalPrice() {
		return this._basket.reduce(
			(sum, item) => sum + item.price * (item.quantity || 1),
			0
		)
	}

	get totalCount() {
		return this._basket.reduce((sum, item) => sum + (item.quantity || 1), 0)
	}

	async addToBasket(deviceId) {
		await $authHost.post('/basket', { deviceId })
		await this.fetchBasket()
	}

	async fetchBasket() {
		try {
			const { data } = await $authHost.get('/basket')
			this.setBasket(data)
		} catch (e) {
			this.setBasket([])
		}
	}

	async removeOneFromBasket(deviceId) {
		await $authHost.delete(`/basket/${deviceId}/one`)
		await this.fetchBasket()
	}

	async removeAllFromBasket(deviceId) {
		await $authHost.delete(`/basket/${deviceId}`)
		await this.fetchBasket()
	}
}

export default BasketStore
