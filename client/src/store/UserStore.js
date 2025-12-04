import { makeAutoObservable } from 'mobx'
import { $host, $authHost } from '../http'

export default class UserStore {
	constructor() {
		this._isAuth = false
		this._user = {}
		makeAutoObservable(this)
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
			console.log('🔐 Login response:', data) // ДОБАВЛЕНО: лог
			console.log('👤 User data:', data.user) // ДОБАВЛЕНО: лог
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
		const token = localStorage.getItem('token')

		if (!token) {
			console.log('No token found')
			return
		}

		try {
			console.log('Checking auth with token...')
			const { data } = await $authHost.get('/user/auth')
			localStorage.setItem('token', data.token)
			this.setIsAuth(true)
			this.setUser(data.user)
			console.log('Auth check successful:', data.user.email)
		} catch (e) {
			console.log('Auth check failed:', e.response?.status)
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
