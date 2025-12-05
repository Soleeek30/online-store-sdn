// src/components/WelcomeModal.js
import React, { useState, useEffect } from 'react'
import { Modal, Button, Card, Row, Col } from 'react-bootstrap'

const WelcomeModal = () => {
	const [show, setShow] = useState(false)

	useEffect(() => {
		// Проверяем, показывали ли уже это окно
		const hasSeenWelcome = localStorage.getItem('hasSeenWelcome')
		if (!hasSeenWelcome) {
			setShow(true)
		}
	}, [])

	const handleClose = () => {
		// Сохраняем, что пользователь видел приветствие
		localStorage.setItem('hasSeenWelcome', 'true')
		setShow(false)
	}

	return (
		<Modal
			show={show}
			onHide={handleClose}
			size='lg'
			centered
			backdrop='static'
			keyboard={false}
		>
			<Modal.Header
				closeButton
				style={{
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					color: 'white',
					border: 'none',
				}}
			>
				<Modal.Title className='w-100 text-center'>
					<h2>🎉 Добро пожаловать в SDN!</h2>
				</Modal.Title>
			</Modal.Header>

			<Modal.Body
				style={{
					background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%)',
					color: 'white',
					padding: '30px',
				}}
			>
				<div className='text-center mb-4'>
					<h4 style={{ color: '#74b9ff' }}>
						Интернет-магазин электроники и техники
					</h4>
					<p className='text-muted'>
						Здесь вы можете просматривать товары, добавлять их в корзину и
						делать покупки
					</p>
				</div>

				<Row className='g-3'>
					{/* Для всех пользователей */}
					<Col md={6}>
						<Card
							style={{
								background: 'rgba(255, 107, 53, 0.1)',
								border: '2px solid #ff6b35',
								borderRadius: '15px',
								height: '100%',
							}}
						>
							<Card.Body>
								<h5 className='text-warning mb-3'>🛍️ Для покупателей</h5>
								<ul style={{ color: '#e0e0e0', lineHeight: '2' }}>
									<li>📱 Просматривайте каталог товаров</li>
									<li>🔍 Фильтруйте по типам и брендам</li>
									<li>🛒 Добавляйте товары в корзину</li>
									<li>➕➖ Изменяйте количество прямо в карточке</li>
									<li>💰 Оформляйте заказы</li>
								</ul>
							</Card.Body>
						</Card>
					</Col>

					{/* Для администраторов */}
					<Col md={6}>
						<Card
							style={{
								background: 'rgba(13, 110, 253, 0.1)',
								border: '2px solid #0d6efd',
								borderRadius: '15px',
								height: '100%',
							}}
						>
							<Card.Body>
								<h5 className='text-info mb-3'>👑 Для администраторов</h5>
								<ul style={{ color: '#e0e0e0', lineHeight: '2' }}>
									<li>➕ Добавляйте новые товары</li>
									<li>🏷️ Создавайте типы и бренды</li>
									<li>📝 Управляйте характеристиками</li>
									<li>🖼️ Загружайте изображения</li>
									<li>⚙️ Полный контроль над каталогом</li>
								</ul>
							</Card.Body>
						</Card>
					</Col>
				</Row>

				<div
					className='mt-4 p-3'
					style={{
						background: 'rgba(40, 167, 69, 0.1)',
						border: '2px solid #28a745',
						borderRadius: '15px',
					}}
				>
					<h6 className='text-success mb-2'>✨ Как начать?</h6>
					<ol style={{ color: '#e0e0e0', marginBottom: 0 }}>
						<li>
							<strong>Зарегистрируйтесь</strong> или <strong>войдите</strong> в
							аккаунт
						</li>
						<li>
							Выберите интересующий вас <strong>тип товара</strong>{' '}
							(Холодильники, Смартфоны)
						</li>
						<li>
							Отфильтруйте по <strong>бренду</strong> (Samsung, Apple, и другие)
						</li>
						<li>
							Нажмите на <strong>оранжевую кнопку "В корзину"</strong>
						</li>
						<li>
							Перейдите в <strong>корзину</strong> и оформите заказ!
						</li>
					</ol>
				</div>

				<div className='mt-3 text-center text-muted small'>
					<p className='mb-0'>
						💡 Это окно больше не появится, так как вы уже знаете, как
						пользоваться сайтом!
					</p>
				</div>
			</Modal.Body>

			<Modal.Footer
				style={{
					background: 'rgba(13, 110, 253, 0.1)',
					border: 'none',
					justifyContent: 'center',
				}}
			>
				<Button
					variant='success'
					size='lg'
					onClick={handleClose}
					style={{
						background: 'linear-gradient(135deg, #667eea 0%, #18269eff 100%)',
						border: 'none',
						padding: '12px 50px',
						fontSize: '18px',
						fontWeight: 'bold',
						borderRadius: '25px',
						boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
					}}
				>
					🚀 Начать покупки!
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default WelcomeModal
