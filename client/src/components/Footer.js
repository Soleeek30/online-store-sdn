// src/components/Footer.js
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
	return (
		<footer
			style={{
				background: 'rgba(10, 10, 30, 0.95)',
				borderTop: '2px solid rgba(255, 107, 53, 0.3)',
				color: '#e0e0e0',
				padding: '30px 0 20px 0',
				marginTop: 'auto',
			}}
		>
			<Container>
				<Row className='mb-3'>
					<Col md={6} className='mb-3 mb-md-0'>
						<h5
							style={{
								color: '#ff6b35',
								fontWeight: 'bold',
								marginBottom: '15px',
							}}
						>
							SDN - Интернет-магазин электроники
						</h5>
						<p
							style={{ color: '#b0b0b0', fontSize: '14px', lineHeight: '1.6' }}
						>
							Учебный проект, демонстрирующий функционал современного
							интернет-магазина с корзиной, авторизацией и административной
							панелью.
						</p>
					</Col>
					<Col md={6}>
						<h6 style={{ color: '#74b9ff', marginBottom: '15px' }}>
							⚠️ Важная информация
						</h6>
						<p
							style={{
								color: '#b0b0b0',
								fontSize: '13px',
								lineHeight: '1.6',
								marginBottom: '10px',
							}}
						>
							Данный сайт является <strong>учебным макетом</strong> и не
							предоставляет реальных услуг по продаже товаров. Все
							представленные товары и цены носят демонстрационный характер.
						</p>
					</Col>
				</Row>

				<hr
					style={{ borderColor: 'rgba(255, 107, 53, 0.2)', margin: '20px 0' }}
				/>

				<Row className='align-items-center'>
					<Col md={6} className='text-center text-md-start mb-2 mb-md-0'>
						<p
							style={{
								margin: 0,
								fontSize: '14px',
								color: '#b0b0b0',
							}}
						>
							Разработчик:{' '}
							<strong style={{ color: '#fff' }}>
								Фильков Константин Павлович
							</strong>
						</p>
					</Col>
					<Col md={6} className='text-center text-md-end'>
						<p
							style={{
								margin: 0,
								fontSize: '13px',
								color: '#888',
							}}
						>
							© 2025 SDN. Все права защищены.
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
