import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Routes } from '../../../constants';

import RegisterPage from '../../../pages/RegisterPage';
import LoginPage from '../../../pages/LoginPage';
import LogoutPage from '../../../pages/LogoutPage';
import GamePage from '../../../pages/GamePage';
import HomePage from '../../../pages/HomePage';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={Routes.REGISTER_ROUTE} component={RegisterPage} />
        <Route exact path={Routes.LOGIN_ROUTE} component={LoginPage} />
        <Route exact path={Routes.LOGOUT_ROUTE} component={LogoutPage} />
        <Route exact path={Routes.GAME_ROUTE} component={GamePage} />
        <Route exact path={Routes.HOME_ROUTE} component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
