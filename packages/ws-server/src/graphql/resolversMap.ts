import { IResolvers } from '@graphql-tools/utils';
import { merge } from 'lodash';

import UserResolvers from './resolvers/UserResolvers';

const resolvers: IResolvers = merge(UserResolvers);

export default resolvers;
