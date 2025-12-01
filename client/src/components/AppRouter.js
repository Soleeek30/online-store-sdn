// src/components/AppRouter.js
import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { Context } from '../index'
import { SHOP_ROUTE } from '../const'

const AppRouter = () => {
	const { user } = useContext(Context)

	return (
		<Routes>
			{user.isAuth &&
				authRoutes.map(({ path, element }) => (
					<Route key={path} path={path} element={element} />
				))}
			{publicRoutes.map(({ path, element }) => (
				<Route key={path} path={path} element={element} />
			))}
			<Route path='*' element={<Navigate to={SHOP_ROUTE} />} />
		</Routes>
	)
}

export default AppRouter
