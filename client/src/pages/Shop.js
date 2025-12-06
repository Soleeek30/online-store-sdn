import React, { useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import Pages from '../components/Pages'
import { Context } from '../index'
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceAPI'

const Shop = observer(() => {
	const { device } = useContext(Context)

	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchBrands().then(data => device.setBrands(data))
	}, [device])

	useEffect(() => {
		fetchDevices(
			device.selectedType?.id,
			device.selectedBrand?.id,
			device.page,
			device.limit
		).then(data => {
			device.setDevices(data.rows)
			device.setTotalCount(data.count)
		})
	}, [device, device.selectedType, device.selectedBrand, device.page])

	return (
		<Container className='mt-4'>
			<Row>
				<Col md={3}>
					<TypeBar />
				</Col>
				<Col md={9}>
					<BrandBar />
					<DeviceList />
					<Pages />
				</Col>
			</Row>
		</Container>
	)
})

export default Shop
