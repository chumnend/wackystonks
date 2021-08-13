import { IResolvers } from '@graphql-tools/utils';
import { merge } from 'lodash';

import AuthResolvers from './resolvers/AuthResolvers';

const resolverMap: IResolvers = merge(AuthResolvers);

export default resolverMap;
