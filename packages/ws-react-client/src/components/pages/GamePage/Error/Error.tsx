import { Link } from 'react-router-dom';

import Flex from '../../../common/Flex';
import PageWrapper from '../../../common/PageWrapper';
import { ROUTES } from '../../../../helpers/constants';

const Error = () => {
  return (
    <PageWrapper>
      <Flex direction="column" alignItems="center">
        <p>Sorry, This game no longer exists :(</p>
        <Link to={ROUTES.HOME_ROUTE}>Return to home</Link>
      </Flex>
    </PageWrapper>
  );
};

export default Error;
