import { Link } from 'react-router-dom';

import { HOME_ROUTE, DEMO_ROUTE } from '../Router';

const NavBar = () => {
  return (
    <div>
      <nav>
        <Link to={HOME_ROUTE}>Home</Link>
        <Link to={DEMO_ROUTE}>Demo</Link>
      </nav>
    </div>
  );
};

export default NavBar;
