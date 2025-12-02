// client/src/http/index.js
import axios from 'axios'

const $host = axios.create({
	baseURL: 'http://localhost:5000/api',
})

const $authHost = axios.create({
	baseURL: 'http://localhost:5000/api',
})

const authInterceptor = config => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.authorization = `Bearer ${token}`
		console.log('📤 Sending request with token')
	} else {
		console.warn('⚠️ No token found for authenticated request')
	}
	return config
}

// Перехватчик ответов для обработки 401 ошибок
const responseInterceptor = response => response

const errorInterceptor = error => {
	if (error.response?.status === 401) {
		console.error('🔒 Unauthorized - token may be expired')
		// Можно добавить редирект на страницу входа
		// window.location.href = '/login'
	}
	return Promise.reject(error)
}

$authHost.interceptors.request.use(authInterceptor)
$authHost.interceptors.response.use(responseInterceptor, errorInterceptor)

export { $host, $authHost }
