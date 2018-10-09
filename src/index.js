import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { unregister} from './registerServiceWorker';
//import { registerServiceWorker} from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
unregister();
//registerServiceWorker();
