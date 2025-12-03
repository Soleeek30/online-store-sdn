import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const BrandBar = observer(() => {
	const { device } = useContext(Context)

	// Сортируем бренды по ID (новые справа)
	const sortedBrands = [...device.brands].sort((a, b) => a.id - b.id)

	return (
		<Row className='mb-4'>
			{/* Кнопка "Все бренды" */}
			<Col xs='auto' className='mb-2'>
				<Card
					style={{
						cursor: 'pointer',
						padding: '12px 24px',
						borderRadius: '20px',
						border: !device.selectedBrand?.id
							? '2px solid #ff6b35'
							: '2px solid rgba(255, 107, 53, 0.3)',
						background: !device.selectedBrand?.id
							? '#ff6b35'
							: 'rgba(25, 25, 55, 0.95)',
						color: !device.selectedBrand?.id ? 'white' : '#ff6b35',
						transition: 'all 0.3s ease',
						fontWeight: 'bold',
					}}
					onClick={() => device.setSelectedBrand({})}
				>
					Все бренды
				</Card>
			</Col>

			{/* Список брендов */}
			{sortedBrands.map(brand => (
				<Col xs='auto' key={brand.id} className='mb-2'>
					<Card
						style={{
							cursor: 'pointer',
							padding: '12px 24px',
							borderRadius: '20px',
							border:
								brand.id === device.selectedBrand?.id
									? '2px solid #ff6b35'
									: '2px solid rgba(255, 107, 53, 0.3)',
							background:
								brand.id === device.selectedBrand?.id
									? '#ff6b35'
									: 'rgba(25, 25, 55, 0.95)',
							color:
								brand.id === device.selectedBrand?.id ? 'white' : '#ff6b35',
							transition: 'all 0.3s ease',
							fontWeight: 'bold',
						}}
						onClick={() => device.setSelectedBrand(brand)}
					>
						{brand.name}
					</Card>
				</Col>
			))}
		</Row>
	)
})

export default BrandBar
