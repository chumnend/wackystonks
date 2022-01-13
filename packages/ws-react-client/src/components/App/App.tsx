import { createGlobalStyle } from 'styled-components';

import AppProviders from './AppProviders';
import Router from './Router';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html, body, #root {
        margin: 0;
        padding: 0;
        position: relative;
        width: 100%;
        min-width: 100vw;
        height: auto;
        min-height: 100vh;
        font-size: 1rem;
        background-color: #fff;
        color: #000;
    }
    h1, h2, h3, h4, h5, h6, ul, li, p {
      margin: 0;
      padding: 0;
    }
`;

const App = () => {
  return (
    <AppProviders>
      <GlobalStyle />
      <Router />
    </AppProviders>
  );
};

export default App;
