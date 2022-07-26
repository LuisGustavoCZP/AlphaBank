/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';
/* import './App.css'; */
import './styles/global.css';

function App()
{
	return (
		<div className="App">
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</div>
	);
}

export default App;
