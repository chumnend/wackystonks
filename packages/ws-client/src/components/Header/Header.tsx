import { Link } from 'react-router-dom';

import * as Styled from './styles';
import { Routes } from '../../constants';
import { useAuth } from '../../context/AuthProvider';

const Header = () => {
  const auth = useAuth();

  return (
    <Styled.Header>
      <Styled.Side />
      {!auth?.isAuth && (
        <Styled.AuthNav>
          <Link to={Routes.HOME_ROUTE}>Home</Link>
        </Styled.AuthNav>
      )}
    </Styled.Header>
  );
};

export default Header;
