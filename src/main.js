import React from 'react';
import ReactDOM from 'react-dom';
import './pages/business/App/index.css';
import App from './pages/business/App/Root';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

