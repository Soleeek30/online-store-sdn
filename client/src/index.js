import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import UserStore from './store/UserStore'
import DeviceStore from './store/DeviceStore'
import BasketStore from './store/BasketStore'

export const Context = createContext(null)

const userStore = new UserStore()
const deviceStore = new DeviceStore()
const basketStore = new BasketStore()

userStore.checkAuth().finally(() => {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<Context.Provider
			value={{
				user: userStore,
				device: deviceStore,
				basket: basketStore,
			}}
		>
			<App />
		</Context.Provider>
	)
})
