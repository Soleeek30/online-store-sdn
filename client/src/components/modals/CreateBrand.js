import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { createBrand } from '../../http/brandAPI'

const CreateBrand = ({ show, onHide }) => {
	const [name, setName] = useState('')

	const addBrand = async () => {
		try {
			if (!name) {
				alert('Введите название бренда')
				return
			}

			console.log('📦 Creating brand:', name)

			await createBrand({ name })

			console.log('✅ Brand created successfully')
			alert('Бренд успешно создан!')

			// Очищаем форму
			setName('')
			onHide()
		} catch (error) {
			console.error('❌ Error creating brand:', error)
			alert(error.response?.data?.message || 'Ошибка при создании бренда')
		}
	}

	return (
		<Modal show={show} onHide={onHide} size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title>Добавить бренд</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						className='mt-3'
						placeholder='Введите название бренда'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрыть
				</Button>
				<Button variant='outline-success' onClick={addBrand}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateBrand
