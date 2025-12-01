import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import DeviceItem from './DeviceItem'
import { Row } from 'react-bootstrap'

const DeviceList = observer(() => {
	const { device } = useContext(Context)

	if (device.devices.length === 0) {
		return (
			<div className='text-center mt-5'>
				<h4>Товары не найдены</h4>
			</div>
		)
	}

	return (
		<Row className='d-flex'>
			{device.devices.map(dev => (
				<DeviceItem key={dev.id} device={dev} />
			))}
		</Row>
	)
})

export default DeviceList
