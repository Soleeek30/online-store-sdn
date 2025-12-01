// src/components/modals/CreateType.js
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { createType } from '../../http/deviceAPI'

const CreateType = ({ show, onHide }) => {
	const [value, setValue] = useState('')

	const addType = () => {
		createType({ name: value }).then(data => {
			setValue('')
			onHide()
		})
	}

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>Добавить тип</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder='Введите название типа'
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрыть
				</Button>
				<Button variant='outline-success' onClick={addType}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateType
