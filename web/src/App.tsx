/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, RouterProps } from 'react-router-dom';
import { UserProvider, useUser } from './providers/UserProvider';
import { Router } from './routes';

/* import './App.css'; */

function App()
{
	const {loading} = useUser();
	return (
		<UserProvider>
			<div className={`max-portrait${loading?' animate-pulse':''}`} >
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</div>
		</UserProvider>
	);
}

export default App;
