import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import LogoutPage from '../../pages/LogoutPage';
import RegisterPage from '../../pages/RegisterPage';
import DemoPage from '../../pages/DemoPage';

export const HOME_ROUTE = '/';
export const REGISTER_ROUTE = '/register';
export const LOGIN_ROUTE = '/login';
export const LOGOUT_ROUTE = '/logout';
export const DEMO_ROUTE = '/demo';

const Router = () => {
  return (
    <BrowserRouter>
      <Route exact path={REGISTER_ROUTE} component={RegisterPage} />
      <Route exact path={LOGIN_ROUTE} component={LoginPage} />
      <Route exact path={LOGOUT_ROUTE} component={LogoutPage} />
      <Route exact path={DEMO_ROUTE} component={DemoPage} />
      <Route exact path={HOME_ROUTE} component={HomePage} />
    </BrowserRouter>
  );
};

export default Router;
