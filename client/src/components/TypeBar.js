// src/components/TypeBar.js
import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import ListGroup from 'react-bootstrap/ListGroup'

const TypeBar = observer(() => {
	const { device } = useContext(Context)

	return (
		<ListGroup className='gap-3'>
			{device.types.map(type => (
				<ListGroup.Item
					key={type.id}
					active={type.id === device.selectedType?.id}
					onClick={() => device.setSelectedType(type)}
					style={{
						cursor: 'pointer',
						borderRadius: '12px',
						textAlign: 'center',
						padding: '14px',
						fontWeight: '600',
						background:
							type.id === device.selectedType?.id
								? '#ff6b35'
								: 'rgba(30, 30, 60, 0.8)',
						color: type.id === device.selectedType?.id ? 'black' : '#ff9a6a',
						border: '2px solid #ff6b35',
					}}
				>
					{type.name}
				</ListGroup.Item>
			))}
		</ListGroup>
	)
})

export default TypeBar
