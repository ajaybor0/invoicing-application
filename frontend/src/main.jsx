import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './routes/Routes.jsx';
import { Provider } from 'react-redux';
import store from './store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>
);
