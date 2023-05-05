import React from 'react'
import { UserContextProvider } from './Context/Context'
import PageRouter from './Router'


const App = () => {
	return (
		<UserContextProvider>
			<div className='container-main'>
				<PageRouter />
			</div>
		</UserContextProvider>
	)
}

export default App