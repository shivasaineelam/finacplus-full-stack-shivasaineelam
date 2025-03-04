import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';
import { Provider } from 'react-redux';
import appStore from './utlils/appStore';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
