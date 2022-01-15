import { Link } from 'react-router-dom';

import Flex from '../../../common/Flex';
import PageWrapper from '../../../common/PageWrapper';
import * as Routes from '../../../../helpers/routes';

const Error = () => {
  return (
    <PageWrapper>
      <Flex direction="column" alignItems="center">
        <p>Sorry, This game no longer exists :(</p>
        <Link to={Routes.HOME_ROUTE}>Return to home</Link>
      </Flex>
    </PageWrapper>
  );
};

export default Error;
