import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom' 
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App'
import './index.css'

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
	<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
		<Router>
			<App tab="home" />
		</Router>
	</GoogleOAuthProvider>
);
