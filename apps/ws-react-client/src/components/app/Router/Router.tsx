import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from '../../pages/home/HomePage';
import GamePage from '../../pages/game/GamePage';
import { ROUTES } from '../../../helpers/constants';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.GAME_ROUTE} component={GamePage} />
        <Route path={ROUTES.HOME_ROUTE} component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
