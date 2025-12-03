// src/components/DeviceList.js — 100% РАБОЧИЙ ВАРИАНТ
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import DeviceItem from './DeviceItem'
import { Row, Col } from 'react-bootstrap'

const DeviceList = observer(() => {
	const { device } = useContext(Context)

	// Защита от undefined
	if (!device || !device.devices || device.devices.length === 0) {
		return (
			<div className='text-center mt-5'>
				<h4>Товары не найдены</h4>
			</div>
		)
	}

	return (
		<Row className='g-4'>
			{device.devices.map(device => (
				<Col key={device.id} xs={12} sm={6} md={4}>
					<DeviceItem device={device} />
				</Col>
			))}
		</Row>
	)
})

export default DeviceList
