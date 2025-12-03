// src/components/BrandBar.js
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import Card from 'react-bootstrap/Card'

const BrandBar = observer(() => {
	const { device } = useContext(Context)

	return (
		<div className='d-flex flex-wrap gap-3'>
			{device.brands.map(brand => (
				<Card
					key={brand.id}
					className='p-3 text-center'
					style={{
						cursor: 'pointer',
						width: '140px',
						borderRadius: '12px',
						background:
							brand.id === device.selectedBrand?.id
								? '#ff6b35'
								: 'rgba(30, 30, 60, 0.8)',
						color: brand.id === device.selectedBrand?.id ? 'black' : '#ff9a6a',
						border: '2px solid #ff6b35',
						transition: 'all 0.3s',
					}}
					onClick={() => device.setSelectedBrand(brand)}
				>
					{brand.name}
				</Card>
			))}
		</div>
	)
})

export default BrandBar
