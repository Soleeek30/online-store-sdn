// src/pages/DevicePage.js
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchOneDevice } from '../http/deviceAPI'
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap'

const DevicePage = observer(() => {
	const [device, setDevice] = useState({ info: [] })
	const [loading, setLoading] = useState(true)
	const { id } = useParams()
	const { basket } = useContext(Context) // ← ДОБАВИЛ basket!

	useEffect(() => {
		fetchOneDevice(id)
			.then(data => setDevice(data))
			.finally(() => setLoading(false))
	}, [id])

	if (loading) {
		return (
			<Container
				className='d-flex justify-content-center align-items-center'
				style={{ height: '80vh' }}
			>
				<div
					className='spinner-border text-primary'
					style={{ width: '4rem', height: '4rem' }}
				/>
			</Container>
		)
	}

	if (!device || !device.id) {
		return (
			<Container className='mt-5 text-center'>
				<h2>Товар не найден</h2>
			</Container>
		)
	}

	return (
		<Container className='mt-5'>
			<Row>
				<Col md={4}>
					<Image
						width={300}
						height={300}
						src={process.env.REACT_APP_API_URL + device.img}
						style={{ objectFit: 'contain', borderRadius: '20px' }}
						onError={e =>
							(e.target.src = 'https://via.placeholder.com/300?text=No+Image')
						}
					/>
				</Col>
				<Col md={8}>
					<h1 style={{ color: '#74b9ff' }}>{device.name}</h1>
					<h2 className='text-warning mt-4'>
						{device.price?.toLocaleString() || '0'} ₽
					</h2>

					<Button
						variant='success'
						size='lg'
						className='mt-4 px-5 fw-bold'
						style={{
							background: '#28a745',
							border: 'none',
							borderRadius: '12px',
							boxShadow: '0 0 20px rgba(40, 167, 69, 0.6)',
						}}
						onClick={() => basket.addToBasket(device.id)}
					>
						Добавить в корзину
					</Button>

					<div className='mt-5'>
						<h3 style={{ color: '#ff6b35' }}>Характеристики</h3>
						{device.info?.length > 0 ? (
							device.info.map((info, index) => (
								<Card
									key={info.id}
									className='p-3 mb-2'
									style={{
										background: 'rgba(30, 30, 60, 0.8)',
										border: '1px solid #ff6b35',
										color: '#ff9a6a',
									}}
								>
									<div className='d-flex justify-content-between'>
										<span>{info.title}</span>
										<strong>{info.description}</strong>
									</div>
								</Card>
							))
						) : (
							<p className='text-muted'>Характеристики не указаны</p>
						)}
					</div>
				</Col>
			</Row>
		</Container>
	)
})

export default DevicePage
