import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import GamePage from '../../pages/GamePage';
import * as Routes from '../../../helpers/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.GAME_ROUTE} component={GamePage} />
        <Route path={Routes.HOME_ROUTE} component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
