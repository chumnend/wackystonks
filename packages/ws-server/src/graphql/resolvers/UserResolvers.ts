import { IResolvers } from '@graphql-tools/utils';

import { AuthResponse, User, MutationRegisterArgs, QueryLoginArgs, QueryUserArgs } from '../generated';

const UserResolvers: IResolvers = {
  Query: {
    async login(_: void, args: QueryLoginArgs): Promise<AuthResponse> {
      return {
        token: 'token',
      };
    },

    users(parent, args, context): User[] {
      const { models } = context;
      return Object.values(models.users);
    },

    user(_: void, args: QueryUserArgs, context): User {
      const { id } = args;
      const { models } = context;
      return models.users[id];
    },

    me(parent, args, context): User {
      return context.me;
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

export default UserResolvers;
