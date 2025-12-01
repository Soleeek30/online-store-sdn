// src/pages/Basket.js
import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Container, Card, Row, Col, Button, Image } from 'react-bootstrap'

const Basket = observer(() => {
	const { basket, user } = useContext(Context)

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
			</Container>
		)
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
								onError={e =>
									(e.target.src = 'https://via.placeholder.com/100?text=No+Img')
								}
							/>
						</Col>

						{/* Название и количество */}
						<Col md={5}>
							<h4 style={{ color: '#74b9ff', margin: 0 }}>{item.name}</h4>
							<p className='text-light mt-2 mb-0'>× {item.quantity || 1} шт.</p>
						</Col>

						{/* Цена за позицию */}
						<Col md={3} className='text-end'>
							<h4 className='text-warning'>
								{(item.price * (item.quantity || 1)).toLocaleString()} ₽
							</h4>
						</Col>

						{/* Кнопка удаления */}
						<Col md={2} className='text-end'>
							<Button
								variant='outline-danger'
								size='lg'
								onClick={() => basket.removeOneFromBasket(item.id)}
							>
								Удалить
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
