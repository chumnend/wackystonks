import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import AuthProvider from './providers/AuthProvider';
import GQLProvider from './providers/GQLProvider';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <GQLProvider>
        <App />
      </GQLProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
