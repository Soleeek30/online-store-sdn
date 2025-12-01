import { makeAutoObservable } from 'mobx'
import { $host, $authHost } from '../http'

export default class UserStore {
	constructor() {
		this._isAuth = false
		this._user = {}
		makeAutoObservable(this)
		this.checkAuthFromToken()
	}

	async checkAuthFromToken() {
		const token = localStorage.getItem('token')

		if (token) {
			try {
				const { data } = await $authHost.get('api/user/auth')
				localStorage.setItem('token', data.token)
				this.setIsAuth(true)
				this.setUser(data.user)
			} catch (e) {
				this.logout()
			}
		}
	}

	setIsAuth(bool) {
		this._isAuth = bool
	}

	setUser(user) {
		this._user = user
	}

	async registration(email, password) {
		try {
			const { data } = await $host.post('/user/registration', {
				email,
				password,
				role: 'USER',
			})
			localStorage.setItem('token', data.token)
			this.setIsAuth(true)
			this.setUser(data.user)
			return data
		} catch (e) {
			console.log(e.response?.data?.message)
			throw e
		}
	}

	async login(email, password) {
		try {
			const { data } = await $host.post('/user/login', { email, password })
			localStorage.setItem('token', data.token)
			this.setIsAuth(true)
			this.setUser(data.user)
			return data
		} catch (e) {
			console.log(e.response?.data?.message)
			throw e
		}
	}

	async logout() {
		localStorage.removeItem('token')
		this.setIsAuth(false)
		this.setUser({})
	}

	async checkAuth() {
		try {
			const { data } = await $authHost.get('api/user/auth')
			localStorage.setItem('token', data.token)
			this.setIsAuth(true)
			this.setUser(data.user)
		} catch (e) {
			this.logout()
		}
	}

	get isAuth() {
		return this._isAuth
	}

	get user() {
		return this._user
	}
}
