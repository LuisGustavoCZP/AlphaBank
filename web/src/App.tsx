/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, RouterProps } from 'react-router-dom';
import { UserProvider } from './providers/UserProvider';
import { Router } from './routes';

/* import './App.css'; */

function App()
{
	return (
		<div className="max-portrait">
			<UserProvider>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</UserProvider>
		</div>
	);
}

export default App;
