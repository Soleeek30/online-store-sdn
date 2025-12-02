// src/components/AppRouter.js
import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { authRoutes, publicRoutes } from '../routes'
import { Context } from '../index'
import { SHOP_ROUTE } from '../const'

const AppRouter = observer(() => {
	const { user } = useContext(Context)

	console.log('🔄 AppRouter render, isAuth:', user.isAuth)

	return (
		<Routes>
			{user.isAuth &&
				authRoutes.map(({ path, element }) => {
					console.log('✅ Auth route enabled:', path)
					return <Route key={path} path={path} element={element} />
				})}
			{publicRoutes.map(({ path, element }) => (
				<Route key={path} path={path} element={element} />
			))}
			<Route path='*' element={<Navigate to={SHOP_ROUTE} replace />} />
		</Routes>
	)
})

export default AppRouter
