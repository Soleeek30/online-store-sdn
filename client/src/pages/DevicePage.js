import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { fetchOneDevice } from '../http/deviceAPI'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const DevicePage = observer(() => {
	const [device, setDevice] = React.useState({ info: [] })
	const { id } = useParams()

	useEffect(() => {
		fetchOneDevice(id).then(data => setDevice(data))
	}, [id])

	return (
		<Container className='mt-4'>
			<Row>
				<Col md={4}>
					<Image
						width={300}
						height={300}
						src={process.env.REACT_APP_API_URL + device.img}
						style={{ objectFit: 'contain' }}
					/>
				</Col>
				<Col md={4}>
					<h2>{device.name}</h2>
					<div className='d-flex align-items-center justify-content-center mt-4'>
						<div className='display-1 fw-bold'>{device.price} ₽</div>
					</div>
					<Button variant='outline-success' size='lg' className='w-100 mt-4'>
						Добавить в корзину
					</Button>
				</Col>
				<Col md={4}>
					<h3>Характеристики</h3>
					{device.info.map((info, index) => (
						<Card
							key={info.id}
							className={`p-3 mb-2 ${index % 2 === 0 ? 'bg-light' : ''}`}
						>
							<div className='d-flex justify-content-between'>
								<span>{info.title}:</span>
								<strong>{info.description}</strong>
							</div>
						</Card>
					))}
				</Col>
			</Row>
		</Container>
	)
})

export default DevicePage
