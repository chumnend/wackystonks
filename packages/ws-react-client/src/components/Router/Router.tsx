import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage';
import { HOME_ROUTE } from '../../helpers/routes';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={HOME_ROUTE} component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
