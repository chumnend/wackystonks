import { IResolvers } from '@graphql-tools/utils';

import { AuthResponse, User, MutationRegisterArgs, QueryLoginArgs, QueryUserArgs } from '../generated';

const mockUsers: Record<string, User> = {
  1: {
    id: '1',
    username: 'Nicholas Chumney',
  },
  2: {
    id: '2',
    username: 'Dave Barns',
  },
};

const me = mockUsers[1];

const AuthResolvers: IResolvers = {
  Query: {
    async login(_: void, args: QueryLoginArgs): Promise<AuthResponse> {
      return {
        token: 'token',
      };
    },

    users(): User[] {
      return Object.values(mockUsers);
    },

    user(_: void, args: QueryUserArgs): User {
      const { id } = args;
      return mockUsers[id];
    },

    me(): User {
      return me;
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
