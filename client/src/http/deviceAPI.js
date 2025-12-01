import axios from 'axios'

const $host = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/',
})

const $authHost = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/',
})

const authInterceptor = config => {
	config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
	return config
}
$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }

export const fetchTypes = async () => {
	const { data } = await $host.get('api/type')
	return data
}

export const fetchBrands = async () => {
	const { data } = await $host.get('api/brand')
	return data
}

export const fetchDevices = async (typeId, brandId, page = 1, limit = 12) => {
	const { data } = await $host.get('api/device', {
		params: { typeId, brandId, page, limit },
	})
	return data
}

export const fetchOneDevice = async id => {
	const { data } = await $host.get('api/device/' + id)
	return data
}

export const createType = async type => {
	const { data } = await $authHost.post('api/type', type)
	return data
}

export const createBrand = async brand => {
	const { data } = await $authHost.post('api/brand', brand)
	return data
}

export const createDevice = async device => {
	const { data } = await $authHost.post('api/device', device)
	return data
}