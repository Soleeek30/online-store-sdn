// src/pages/Admin.js
import React, { useState, useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import CreateType from '../components/modals/CreateType'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchDevices, deleteDevice } from '../http/deviceAPI'

const Admin = observer(() => {
	const { device } = useContext(Context)
	const [typeVisible, setTypeVisible] = useState(false)
	const [brandVisible, setBrandVisible] = useState(false)
	const [deviceVisible, setDeviceVisible] = useState(false)

	useEffect(() => {
		fetchDevices().then(data => device.setDevices(data.rows))
	}, [device])

	const removeDevice = async id => {
		if (window.confirm('Точно удалить товар?')) {
			try {
				await deleteDevice(id)
				device.setDevices(device.devices.filter(d => d.id !== id))
				alert('Товар удалён!')
			} catch (e) {
				alert('Ошибка удаления')
			}
		}
	}

	return (
		<Container className='mt-5'>
			<h1 className='mb-4 text-center' style={{ color: '#ff6b35' }}>
				Админ панель
			</h1>

			<Row className='g-3 mb-5'>
				<Col md={4}>
					<Button
						variant='outline-primary'
						size='lg'
						className='w-100'
						onClick={() => setTypeVisible(true)}
					>
						Добавить тип
					</Button>
				</Col>
				<Col md={4}>
					<Button
						variant='outline-primary'
						size='lg'
						className='w-100'
						onClick={() => setBrandVisible(true)}
					>
						Добавить бренд
					</Button>
				</Col>
				<Col md={4}>
					<Button
						variant='outline-primary'
						size='lg'
						className='w-100'
						onClick={() => setDeviceVisible(true)}
					>
						Добавить товар
					</Button>
				</Col>
			</Row>

			<h3 style={{ color: '#74b9ff' }} className='mb-4'>
				Товары в магазине:
			</h3>
			<Row className='g-4'>
				{device.devices.map(d => (
					<Col key={d.id} md={4}>
						<Card
							className='p-3'
							style={{
								background: 'rgba(25,25,55,0.9)',
								border: '2px solid #ff6b35',
							}}
						>
							<Image
								src={process.env.REACT_APP_API_URL + d.img}
								width={200}
								height={200}
								style={{ objectFit: 'contain', borderRadius: '12px' }}
								className='mb-3'
							/>
							<h5 style={{ color: '#74b9ff' }}>{d.name}</h5>
							<p className='text-success fs-4'>{d.price} ₽</p>
							<Button
								variant='danger'
								size='sm'
								onClick={() => removeDevice(d.id)}
								className='w-100 mt-2'
							>
								Удалить товар
							</Button>
						</Card>
					</Col>
				))}
			</Row>

			<CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
			<CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
			<CreateDevice
				show={deviceVisible}
				onHide={() => setDeviceVisible(false)}
			/>
		</Container>
	)
})

export default Admin
