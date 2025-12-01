import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import Card from 'react-bootstrap/Card'

const BrandBar = observer(() => {
	const { device } = useContext(Context)

	return (
		<div className='d-flex flex-wrap gap-3 mb-4'>
			{device.brands.map(brand => (
				<Card
					key={brand.id}
					className={`p-3 text-center brand-card ${
						brand.id === device.selectedBrand?.id ? 'active' : ''
					}`}
					style={{
						cursor: 'pointer',
						width: '160px',
						transition: 'all 0.4s ease',
					}}
					onClick={() => device.setSelectedBrand(brand)}
				>
					<div className='fw-bold'>{brand.name}</div>
				</Card>
			))}
		</div>
	)
})

export default BrandBar
