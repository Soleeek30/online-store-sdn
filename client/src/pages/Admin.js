import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CreateType from '../components/modals/CreateType'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'

const Admin = () => {
	const [typeVisible, setTypeVisible] = useState(false)
	const [brandVisible, setBrandVisible] = useState(false)
	const [deviceVisible, setDeviceVisible] = useState(false)

	return (
		<Container className='mt-5'>
			<h1 className='mb-4 text-center'>Админ панель</h1>
			<Row className='g-3'>
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
						Добавить устройство
					</Button>
				</Col>
			</Row>

			{/* Модальные окна */}
			<CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
			<CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
			<CreateDevice
				show={deviceVisible}
				onHide={() => setDeviceVisible(false)}
			/>
		</Container>
	)
}

export default Admin
