// client/src/http/deviceAPI.js
import { $host, $authHost } from './index'

// Используем уже настроенные axios экземпляры из index.js

export const fetchTypes = async () => {
	const { data } = await $host.get('/type')
	return data
}

export const fetchBrands = async () => {
	const { data } = await $host.get('/brand')
	return data
}

export const fetchDevices = async (typeId, brandId, page = 1, limit = 12) => {
	const { data } = await $host.get('/device', {
		params: { typeId, brandId, page, limit },
	})
	return data
}

export const fetchOneDevice = async id => {
	const { data } = await $host.get('/device/' + id)
	return data
}

export const createType = async type => {
	const { data } = await $authHost.post('/type', type)
	return data
}

export const createBrand = async brand => {
	const { data } = await $authHost.post('/brand', brand)
	return data
}

export const createDevice = async device => {
	const { data } = await $authHost.post('/device', device)
	return data
}

export const deleteDevice = async id => {
	const { data } = await $authHost.delete(`/device/${id}`)
	return data
}
