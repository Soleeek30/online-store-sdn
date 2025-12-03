import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { DEVICE_ROUTE } from '../const'

const DeviceItem = observer(({ device }) => {
	const navigate = useNavigate()
	const { basket, user } = useContext(Context)

	// ИСПРАВЛЕНО: используем computed значение из basket
	const getQuantity = () => {
		const basketItem = basket.basket.find(item => item.id === device.id)
		return basketItem?.quantity || 0
	}

	const addToCart = async e => {
		e.stopPropagation()
		if (!user.isAuth) {
			alert('Войдите в аккаунт')
			return
		}
		try {
			await basket.addToBasket(device.id)
		} catch (error) {
			console.error('Error adding to basket:', error)
			alert('Ошибка при добавлении в корзину')
		}
	}

	const removeOne = async e => {
		e.stopPropagation()
		try {
			await basket.removeOneFromBasket(device.id)
		} catch (error) {
			console.error('Error removing from basket:', error)
		}
	}

	// Вычисляем quantity при каждом рендере
	const quantity = getQuantity()

	return (
		<Card
			className='text-center border-0 shadow'
			style={{
				cursor: 'pointer',
				borderRadius: '20px',
				background: 'rgba(25, 25, 55, 0.95)',
				border: '2px solid #ff6b35',
				transition: 'all 0.3s ease',
				height: '100%',
			}}
			onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
		>
			<Image
				width={180}
				height={180}
				src={process.env.REACT_APP_API_URL + device.img}
				style={{ objectFit: 'contain', borderRadius: '16px', padding: '10px' }}
				className='mb-3'
				onError={e => {
					e.target.src =
						'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="180" height="180"%3E%3Crect fill="%23ddd" width="180" height="180"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E'
				}}
			/>

			<div className='px-3 pb-3'>
				<h6 style={{ color: '#74b9ff', marginBottom: '10px' }}>
					{device.name}
				</h6>

				{/* ЗЕЛЁНАЯ ЦЕНА */}
				<div className='fw-bold fs-4 mb-3' style={{ color: '#28a745' }}>
					{device.price.toLocaleString()} ₽
				</div>

				{/* КНОПКА С СЧЁТЧИКОМ */}
				{quantity === 0 ? (
					<Button
						variant='warning'
						className='w-100 fw-bold'
						style={{
							background: '#ffc107',
							border: 'none',
							borderRadius: '12px',
						}}
						onClick={addToCart}
					>
						В корзину
					</Button>
				) : (
					<div className='d-flex align-items-center justify-content-center gap-3'>
						<Button
							size='sm'
							variant='outline-danger'
							onClick={removeOne}
							style={{ width: '40px' }}
						>
							−
						</Button>
						<span className='fw-bold fs-4 text-warning'>{quantity}</span>
						<Button
							size='sm'
							variant='outline-success'
							onClick={addToCart}
							style={{ width: '40px' }}
						>
							+
						</Button>
					</div>
				)}
			</div>
		</Card>
	)
})

export default DeviceItem
