// src/components/NavBar.js
import React, { useContext } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import {
	SHOP_ROUTE,
	ADMIN_ROUTE,
	BASKET_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
} from '../const'

const NavBar = observer(() => {
	const { user, basket } = useContext(Context)
	const location = useLocation()

	// Проверяем, находимся ли на странице входа/регистрации
	const isAuthPage =
		location.pathname === LOGIN_ROUTE ||
		location.pathname === REGISTRATION_ROUTE

	const logOut = () => {
		user.logout()
		basket.setBasket([]) // очищаем корзину при выходе
	}

	return (
		<Navbar
			bg='dark'
			data-bs-theme='dark'
			expand='lg'
			className='shadow-lg'
			style={{
				backdropFilter: 'blur(10px)',
				background: 'rgba(10, 10, 30, 0.95)',
				borderBottom: '1px solid rgba(100, 100, 255, 0.2)',
				position: 'sticky',
				top: 0,
				zIndex: 1000,
			}}
		>
			<Container>
				<NavLink to={SHOP_ROUTE} className='navbar-brand fw-bold text-warning'>
					SDN
				</NavLink>

				<Navbar.Toggle aria-controls='basic-navbar-nav' />

				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto align-items-center gap-2'>
						{/* КОРЗИНА с бейджиком */}
						{user.isAuth && !isAuthPage && (
							<Nav.Link as={NavLink} to={BASKET_ROUTE}>
								<Button
									variant='outline-light'
									className='position-relative px-4'
								>
									Корзина
									{basket.totalCount > 0 && (
										<span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
											{basket.totalCount}
											<span className='visually-hidden'>товаров в корзине</span>
										</span>
									)}
								</Button>
							</Nav.Link>
						)}

						{/* АДМИН ПАНЕЛЬ */}
						{user.isAuth && !isAuthPage && (
							<Nav.Link as={NavLink} to={ADMIN_ROUTE}>
								<Button
									variant='outline-primary'
									className='fw-medium px-4 border-2'
									style={{
										backgroundColor:
											location.pathname === ADMIN_ROUTE
												? 'rgba(13, 110, 253, 0.2)'
												: 'transparent',
										borderColor:
											location.pathname === ADMIN_ROUTE ? '#0d6efd' : '#74b9ff',
										color: 'white',
									}}
								>
									Админ панель
								</Button>
							</Nav.Link>
						)}

						{/* ВХОД / ВЫХОД */}
						{!isAuthPage &&
							(user.isAuth ? (
								<Button
									variant='outline-danger'
									onClick={logOut}
									className='px-4'
								>
									Выйти
								</Button>
							) : (
								<Nav.Link as={NavLink} to={LOGIN_ROUTE}>
									<Button variant='outline-success' className='px-4'>
										Войти
									</Button>
								</Nav.Link>
							))}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
})

export default NavBar
