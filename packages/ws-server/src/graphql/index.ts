import 'graphql-import-node';

import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { IResolvers } from '@graphql-tools/utils';
import { merge } from 'lodash';

import * as authTypeDefs from './schemas/users.graphql';
import * as emptyTypeDefs from './schemas/empty.graphql';

import UserResolvers from './resolvers/UserResolvers';

const resolvers: IResolvers = merge(UserResolvers);

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [emptyTypeDefs, authTypeDefs],
  resolvers,
});

export default schema;
