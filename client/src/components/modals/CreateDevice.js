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
		const selectedFile = e.target.files[0]
		console.log('📎 File selected:', selectedFile?.name)
		setFile(selectedFile)
	}

	const addDevice = async () => {
		try {
			// Валидация
			if (!name) {
				alert('Введите название устройства')
				return
			}
			if (!price || price <= 0) {
				alert('Введите корректную цену')
				return
			}
			if (!selectedType) {
				alert('Выберите тип устройства')
				return
			}
			if (!selectedBrand) {
				alert('Выберите бренд устройства')
				return
			}
			if (!file) {
				alert('Выберите изображение устройства')
				return
			}

			console.log('📦 Creating device with data:', {
				name,
				price,
				typeId: selectedType.id,
				brandId: selectedBrand.id,
				file: file.name,
				infoCount: info.length,
			})

			const formData = new FormData()
			formData.append('name', name)
			formData.append('price', `${price}`)
			formData.append('img', file)
			formData.append('brandId', selectedBrand.id) // ❌ ОШИБКА — должно быть selectedBrand.id
			formData.append('typeId', selectedType.id) // ❌ ОШИБКА — должно быть selectedType.id

			console.log('📤 Sending FormData...')
			await createDevice(formData)

			console.log('✅ Device created successfully')
			alert('Устройство успешно создано!')

			// Очищаем форму
			setName('')
			setPrice(0)
			setFile(null)
			setInfo([])
			setSelectedType(null)
			setSelectedBrand(null)

			onHide()
		} catch (error) {
			console.error('❌ Error creating device:', error)
			alert(error.response?.data?.message || 'Ошибка при создании устройства')
		}
	}

	return (
		<Modal show={show} onHide={onHide} size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title>Добавить устройство</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className='mt-3'>
						<Dropdown.Toggle variant={selectedType ? 'success' : 'secondary'}>
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
						<Dropdown.Toggle variant={selectedBrand ? 'success' : 'secondary'}>
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
					<Form.Control
						className='mt-3'
						type='file'
						onChange={selectFile}
						accept='image/*'
					/>
					{file && (
						<div className='mt-2 text-success'>✅ Файл выбран: {file.name}</div>
					)}
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
