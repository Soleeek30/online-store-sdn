import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../const'
import { $host } from '../http'

const Auth = observer(() => {
	const { user, basket } = useContext(Context)
	const location = useLocation()
	const navigate = useNavigate()
	const isLogin = location.pathname === LOGIN_ROUTE

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const click = async () => {
		try {
			let response
			if (isLogin) {
				// ИСПРАВЛЕНО: убран /api из пути
				response = await $host.post('/user/login', { email, password })
			} else {
				// ИСПРАВЛЕНО: убран /api из пути
				response = await $host.post('/user/registration', {
					email,
					password,
					role: 'USER',
				})
			}

			// ИСПРАВЛЕНО: правильное извлечение данных из response
			const data = response.data

			localStorage.setItem('token', data.token)
			user.setUser(data.user)
			user.setIsAuth(true)

			// Загружаем корзину после входа
			await basket.fetchBasket()

			navigate(SHOP_ROUTE)
		} catch (e) {
			console.error('Auth error:', e)
			alert(e.response?.data?.message || 'Ошибка входа')
		}
	}

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ height: '100vh' }}
		>
			<Card style={{ width: 600 }} className='p-5 shadow'>
				<h2 className='m-auto mb-4 text-center'>
					{isLogin
						? 'Вход в личную учетную запись пользователя'
						: 'Создание личной учётной записи пользователя'}
				</h2>

				<Form className='d-flex flex-column'>
					<Form.Control
						className='mb-3'
						placeholder='Введите email...'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Form.Control
						className='mb-4'
						type='password'
						placeholder='Введите пароль...'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>

					<div className='d-flex justify-content-between align-items-center mt-3'>
						<Button variant='outline-success' size='lg' onClick={click}>
							{isLogin ? 'Войти' : 'Зарегистрироваться'}
						</Button>

						<div className='text-muted'>
							{isLogin ? (
								<span>
									Впервые здесь?{' '}
									<span
										className='text-primary'
										style={{ cursor: 'pointer' }}
										onClick={() => navigate(REGISTRATION_ROUTE)}
									>
										Создать аккаунт
									</span>
								</span>
							) : (
								<span>
									Уже есть аккаунт?{' '}
									<span
										className='text-primary'
										style={{ cursor: 'pointer' }}
										onClick={() => navigate(LOGIN_ROUTE)}
									>
										Войти
									</span>
								</span>
							)}
						</div>
					</div>
				</Form>
			</Card>
		</Container>
	)
})

export default Auth
