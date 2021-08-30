import { BrowserRouter, Route, Link } from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';

export const HOME_ROUTE = '/';
export const REGISTER_ROUTE = '/register';
export const LOGIN_ROUTE = '/login';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to={HOME_ROUTE}>Home</Link>
          <Link to={REGISTER_ROUTE}>Register</Link>
          <Link to={LOGIN_ROUTE}>Login</Link>
        </nav>
      </div>

      <Route exact path={LOGIN_ROUTE} component={LoginPage} />
      <Route exact path={HOME_ROUTE} component={HomePage} />
    </BrowserRouter>
  );
};

export default Router;
