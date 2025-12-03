// src/store/BasketStore.js
import { makeAutoObservable, runInAction } from 'mobx'
import { $authHost } from '../http'

class BasketStore {
	constructor() {
		this._basket = []
		this._isLoading = false
		makeAutoObservable(this)
	}

	setBasket(basket) {
		this._basket = basket
	}

	setIsLoading(bool) {
		this._isLoading = bool
	}

	get basket() {
		return this._basket
	}

	get isLoading() {
		return this._isLoading
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

	// Метод для получения количества конкретного товара
	getItemQuantity(deviceId) {
		const item = this._basket.find(i => i.id === deviceId)
		return item?.quantity || 0
	}

	async addToBasket(deviceId) {
		try {
			this.setIsLoading(true)
			console.log('Adding to basket:', deviceId)
			const { data } = await $authHost.post('/basket', { deviceId })
			console.log('Response:', data)
			runInAction(() => {
				this.setBasket(data)
				console.log('Basket updated to:', this._basket)
			})
		} catch (e) {
			console.error('Error adding to basket:', e)
			alert(e.response?.data?.message || 'Ошибка добавления в корзину')
		} finally {
			this.setIsLoading(false)
		}
	}

	async fetchBasket() {
		try {
			this.setIsLoading(true)
			console.log('Fetching basket...')
			const { data } = await $authHost.get('/basket')
			console.log('Basket data:', data)
			runInAction(() => {
				this.setBasket(data)
			})
		} catch (e) {
			console.error('Error fetching basket:', e)
			runInAction(() => {
				this.setBasket([])
			})
		} finally {
			this.setIsLoading(false)
		}
	}

	async removeOneFromBasket(deviceId) {
		try {
			this.setIsLoading(true)
			console.log('Removing one from basket:', deviceId)
			const { data } = await $authHost.delete(`/basket/${deviceId}/one`)
			console.log('Response:', data)
			runInAction(() => {
				this.setBasket(data)
			})
		} catch (e) {
			console.error('Error removing one from basket:', e)
			alert(e.response?.data?.message || 'Ошибка удаления из корзины')
		} finally {
			this.setIsLoading(false)
		}
	}

	async removeAllFromBasket(deviceId) {
		try {
			this.setIsLoading(true)
			console.log('Removing all from basket:', deviceId)
			const { data } = await $authHost.delete(`/basket/${deviceId}`)
			console.log('Response:', data)
			runInAction(() => {
				this.setBasket(data)
			})
		} catch (e) {
			console.error('Error removing all from basket:', e)
			alert(e.response?.data?.message || 'Ошибка удаления из корзины')
		} finally {
			this.setIsLoading(false)
		}
	}
}

export default BasketStore
