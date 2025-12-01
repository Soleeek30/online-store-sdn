// src/components/modals/CreateDevice.js
import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import { fetchTypes, fetchBrands, createDevice } from '../../http/deviceAPI'

const CreateDevice = ({ show, onHide }) => {
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [file, setFile] = useState(null)
	const [info, setInfo] = useState([])
	const [types, setTypes] = useState([])
	const [brands, setBrands] = useState([])
	const [selectedType, setSelectedType] = useState(null)
	const [selectedBrand, setSelectedBrand] = useState(null)

	useEffect(() => {
		fetchTypes().then(data => setTypes(data))
		fetchBrands().then(data => setBrands(data))
	}, [])

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }])
	}

	const removeInfo = number => {
		setInfo(info.filter(i => i.number !== number))
	}

	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)))
	}

	const selectFile = e => {
		setFile(e.target.files[0])
	}

	const addDevice = () => {
		const formData = new FormData()
		formData.append('name', name)
		formData.append('price', `${price}`)
		formData.append('img', file)
		formData.append('brandId', selectedBrand.id)
		formData.append('typeId', selectedType.id)
		formData.append('info', JSON.stringify(info))
		createDevice(formData).then(data => onHide())
	}

	return (
		<Modal show={show} onHide={onHide} size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title>Добавить устройство</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className='mt-3'>
						<Dropdown.Toggle>
							{selectedType?.name || 'Выберите тип'}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{types.map(type => (
								<Dropdown.Item
									key={type.id}
									onClick={() => setSelectedType(type)}
								>
									{type.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>

					<Dropdown className='mt-3'>
						<Dropdown.Toggle>
							{selectedBrand?.name || 'Выберите бренд'}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{brands.map(brand => (
								<Dropdown.Item
									key={brand.id}
									onClick={() => setSelectedBrand(brand)}
								>
									{brand.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>

					<Form.Control
						className='mt-3'
						placeholder='Введите название устройства'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<Form.Control
						className='mt-3'
						placeholder='Введите стоимость устройства'
						type='number'
						value={price}
						onChange={e => setPrice(e.target.value)}
					/>
					<Form.Control className='mt-3' type='file' onChange={selectFile} />
					<hr />
					<Button variant='outline-dark' onClick={addInfo}>
						Добавить новую характеристику
					</Button>
					{info.map(i => (
						<div className='mt-3' key={i.number}>
							<Form.Control
								value={i.title}
								onChange={e => changeInfo('title', e.target.value, i.number)}
								placeholder='Введите название характеристики'
							/>
							<Form.Control
								className='mt-2'
								value={i.description}
								onChange={e =>
									changeInfo('description', e.target.value, i.number)
								}
								placeholder='Введите описание характеристики'
							/>
							<Button
								variant='outline-danger'
								className='mt-2'
								onClick={() => removeInfo(i.number)}
							>
								Удалить
							</Button>
						</div>
					))}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>
					Закрыть
				</Button>
				<Button variant='outline-success' onClick={addDevice}>
					Добавить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateDevice
