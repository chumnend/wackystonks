import { GlobalStyle } from './styles';
import AppProviders from './AppProviders';
import Router from './Router';

const App = () => {
  return (
    <AppProviders>
      <GlobalStyle />
      <Router />
    </AppProviders>
  );
};

export default App;
