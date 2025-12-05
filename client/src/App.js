import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from './index'
import NavBar from './components/NavBar'
import AppRouter from './components/AppRouter'
import WelcomeModal from './components/WelcomeModal'
import Footer from './components/Footer'
import { Spinner } from 'react-bootstrap'

const App = observer(() => {
	const { user } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		console.log('🚀 App mounting, checking auth...')
		user.checkAuth().finally(() => {
			console.log('✅ Auth check complete, isAuth:', user.isAuth)
			setLoading(false)
		})
	}, [user])

	if (loading) {
		return (
			<div
				className='d-flex justify-content-center align-items-center'
				style={{ height: '100vh' }}
			>
				<Spinner animation='border' variant='primary' />
			</div>
		)
	}

	return (
		<BrowserRouter>
			<div
				style={{
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<WelcomeModal />
				<NavBar />
				<div style={{ flex: 1 }}>
					<AppRouter />
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	)
})

export default App
