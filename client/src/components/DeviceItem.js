// src/components/DeviceItem.js — 100% РАБОЧАЯ ВЕРСИЯ
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

	const addToCart = e => {
		e.stopPropagation()
		if (!user.isAuth) {
			alert('Войдите в аккаунт')
			return
		}
		basket.addToBasket(device.id)
	}

	const removeOne = e => {
		e.stopPropagation()
		basket.removeOneFromBasket(device.id)
	}

	const quantity =
		basket.basket.find(item => item.id === device.id)?.quantity || 0

	return (
		<Card
			className='p-4 text-center shadow-premium border-0'
			style={{
				cursor: 'pointer',
				borderRadius: '18px',
				background: 'rgba(30, 30, 60, 0.7)',
				backdropFilter: 'blur(12px)',
				transition: 'all 0.4s ease',
			}}
			onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
		>
			<div className='mb-3'>
				<Image
					width={180}
					height={180}
					src={process.env.REACT_APP_API_URL + device.img}
					style={{ objectFit: 'contain', borderRadius: '12px' }}
					onError={e =>
						(e.target.src = 'https://via.placeholder.com/180?text=No+Image')
					}
				/>
			</div>

			<div className='mt-2'>
				<div className='fw-bold mb-2' style={{ color: '#74b9ff' }}>
					{device.name}
				</div>
				<div className='fw-bold fs-5 text-warning'>
					{device.price.toLocaleString()} ₽
				</div>
			</div>

			<div className='mt-3'>
				{quantity === 0 ? (
					<Button
						variant='outline-warning'
						className='w-100'
						onClick={e => {
							e.stopPropagation()
							basket.addToBasket(device.id)
						}}
					>
						В корзину
					</Button>
				) : (
					<div className='d-flex align-items-center justify-content-center gap-3'>
						<Button size='sm' variant='outline-danger' onClick={removeOne}>
							−
						</Button>
						<span className='fw-bold fs-4 text-warning'>{quantity}</span>
						<Button size='sm' variant='outline-success' onClick={addToCart}>
							+
						</Button>
					</div>
				)}
			</div>
		</Card>
	)
})

export default DeviceItem
