import { Link } from 'react-router-dom';

import * as Styled from './styles';
import { HOME_ROUTE, DEMO_ROUTE } from '../Router';
import { useAuth } from '../../context/AuthProvider';

const Header = () => {
  const auth = useAuth();

  return (
    <Styled.Header>
      <Styled.Side />
      {!auth?.isAuth && (
        <Styled.AuthNav>
          <Link to={HOME_ROUTE}>Home</Link>
          <Link to={DEMO_ROUTE}>Demo</Link>
        </Styled.AuthNav>
      )}
    </Styled.Header>
  );
};

export default Header;
