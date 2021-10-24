import React from 'react';
import ReactDOM from 'react-dom';

import AppProviders from './context/AppProviders';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
