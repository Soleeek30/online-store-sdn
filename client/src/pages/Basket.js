// src/pages/Basket.js
import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Container, Card, Row, Col, Button, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { SHOP_ROUTE } from '../const'

const Basket = observer(() => {
	const { basket, user } = useContext(Context)
	const navigate = useNavigate()

	useEffect(() => {
		if (user.isAuth) {
			basket.fetchBasket()
		}
	}, [user.isAuth, basket])

	if (!user.isAuth) {
		return (
			<Container className='mt-5 text-center'>
				<h2>Войдите в аккаунт, чтобы увидеть корзину</h2>
			</Container>
		)
	}

	if (basket.basket.length === 0) {
		return (
			<Container className='mt-5 text-center'>
				<h2 className='text-muted'>Корзина пуста</h2>
				<p>Добавьте товары из каталога</p>
				<Button
					variant='outline-primary'
					size='lg'
					onClick={() => navigate(SHOP_ROUTE)}
					className='mt-3'
				>
					Перейти к покупкам
				</Button>
			</Container>
		)
	}

	const removeOne = async deviceId => {
		try {
			await basket.removeOneFromBasket(deviceId)
		} catch (error) {
			console.error('Error removing from basket:', error)
			alert('Ошибка при удалении товара')
		}
	}

	const addOne = async deviceId => {
		try {
			await basket.addToBasket(deviceId)
		} catch (error) {
			console.error('Error adding to basket:', error)
			alert('Ошибка при добавлении товара')
		}
	}

	const removeAll = async deviceId => {
		try {
			await basket.removeAllFromBasket(deviceId)
		} catch (error) {
			console.error('Error removing all from basket:', error)
			alert('Ошибка при удалении товара')
		}
	}

	return (
		<Container className='mt-5'>
			<h1
				style={{
					color: '#ff6b35',
					textAlign: 'center',
					marginBottom: '40px',
					fontWeight: 'bold',
				}}
			>
				Ваша корзина
			</h1>

			{basket.basket.map(item => (
				<Card
					key={item.id}
					className='mb-4 p-4 shadow-lg'
					style={{
						background: 'rgba(30, 30, 60, 0.95)',
						border: '2px solid #ff6b35',
						borderRadius: '16px',
					}}
				>
					<Row className='align-items-center'>
						{/* Картинка */}
						<Col md={2}>
							<Image
								src={process.env.REACT_APP_API_URL + item.img}
								width={100}
								height={100}
								rounded
								style={{ objectFit: 'contain' }}
								onError={e => {
									e.target.src =
										'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="12"%3ENo Img%3C/text%3E%3C/svg%3E'
								}}
							/>
						</Col>

						{/* Название */}
						<Col md={4}>
							<h4 style={{ color: '#74b9ff', margin: 0 }}>{item.name}</h4>
							<p className='text-light mt-2 mb-0'>
								{item.price.toLocaleString()} ₽ за шт.
							</p>
						</Col>

						{/* Кнопки количества */}
						<Col md={2}>
							<div className='d-flex align-items-center justify-content-center gap-2'>
								<Button
									size='sm'
									variant='outline-danger'
									onClick={() => removeOne(item.id)}
								>
									−
								</Button>
								<span className='fw-bold fs-5 text-warning'>
									{item.quantity || 1}
								</span>
								<Button
									size='sm'
									variant='outline-success'
									onClick={() => addOne(item.id)}
								>
									+
								</Button>
							</div>
						</Col>

						{/* Цена за позицию */}
						<Col md={2} className='text-end'>
							<h4 className='text-warning'>
								{(item.price * (item.quantity || 1)).toLocaleString()} ₽
							</h4>
						</Col>

						{/* Кнопка удаления */}
						<Col md={2} className='text-end'>
							<Button
								variant='outline-danger'
								size='sm'
								onClick={() => removeAll(item.id)}
							>
								Удалить всё
							</Button>
						</Col>
					</Row>
				</Card>
			))}

			{/* Итоговая сумма */}
			<div
				className='text-end mt-5 p-4 rounded-4'
				style={{ background: 'rgba(255, 107, 53, 0.15)' }}
			>
				<h3 className='text-light mb-2'>Товаров: {basket.totalCount} шт.</h3>
				<h2 style={{ color: '#ff6b35', fontWeight: 'bold' }}>
					Итого: {basket.totalPrice.toLocaleString()} ₽
				</h2>
				<Button variant='success' size='lg' className='mt-3 px-5 fw-bold'>
					Оформить заказ
				</Button>
			</div>
		</Container>
	)
})

export default Basket
