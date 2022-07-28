/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, RouterProps } from 'react-router-dom';
import { Router } from './routes';
/* import './App.css'; */


function App()
{
	return (
		<div className="max-portrait">
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</div>
	);
}

export default App;
