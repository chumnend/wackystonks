import { BrowserRouter, Route, Link } from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import LogoutPage from '../../pages/LogoutPage';
import RegisterPage from '../../pages/RegisterPage';
import DemoPage from '../../pages/DemoPage';

import { HOME_ROUTE, REGISTER_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, DEMO_ROUTE } from '../../constants/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to={HOME_ROUTE}>Home</Link>
          <Link to={REGISTER_ROUTE}>Register</Link>
          <Link to={LOGIN_ROUTE}>Login</Link>
          <Link to={LOGOUT_ROUTE}>Logout</Link>
          <Link to={DEMO_ROUTE}>Demo</Link>
        </nav>
      </div>

      <Route exact path={REGISTER_ROUTE} component={RegisterPage} />
      <Route exact path={LOGIN_ROUTE} component={LoginPage} />
      <Route exact path={LOGOUT_ROUTE} component={LogoutPage} />
      <Route exact path={DEMO_ROUTE} component={DemoPage} />
      <Route exact path={HOME_ROUTE} component={HomePage} />
    </BrowserRouter>
  );
};

export default Router;
