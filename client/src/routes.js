// src/routes.js
import Admin from './pages/Admin'
import Basket from './pages/Basket'
import Shop from './pages/Shop'
import Auth from './pages/Auth'
import DevicePage from './pages/DevicePage'

import {
	ADMIN_ROUTE,
	BASKET_ROUTE,
	SHOP_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	DEVICE_ROUTE,
} from './const'

export const authRoutes = [
	{ path: ADMIN_ROUTE, element: <Admin /> },
	{ path: BASKET_ROUTE, element: <Basket /> },
]

export const publicRoutes = [
	{ path: SHOP_ROUTE, element: <Shop /> },
	{ path: LOGIN_ROUTE, element: <Auth /> },
	{ path: REGISTRATION_ROUTE, element: <Auth /> },
	{ path: DEVICE_ROUTE + '/:id', element: <DevicePage /> },
]
