import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import GQLProvider from './providers/GQLProvider';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <GQLProvider>
      <App />
    </GQLProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
