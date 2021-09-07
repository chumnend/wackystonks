import Router from '../Router';
import AppProviders from '../../providers/AppProviders';

const App = () => {
  return (
    <AppProviders>
      <Router />
    </AppProviders>
  );
};

export default App;
