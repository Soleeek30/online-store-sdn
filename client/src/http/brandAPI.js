import { $host, $authHost } from './index'

const createBrand = async brand => {
	const { data } = await $authHost.post('brand', brand)
	return data
}

const fetchBrands = async () => {
	const { data } = await $host.get('brand')
	return data
}

export { createBrand, fetchBrands }
