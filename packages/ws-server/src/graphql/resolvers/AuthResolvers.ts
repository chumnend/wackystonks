import { IResolvers } from '@graphql-tools/utils';

import { AuthResponse, MutationRegisterArgs, QueryLoginArgs } from '../generated';

const AuthResolvers: IResolvers = {
  Query: {
    async login(_: void, args: QueryLoginArgs): Promise<AuthResponse> {
      return {
        token: 'token',
      };
    },
  },

  Mutation: {
    async register(_: void, args: MutationRegisterArgs): Promise<AuthResponse> {
      return {
        token: 'token',
      };
    },
  },
};

export default AuthResolvers;
