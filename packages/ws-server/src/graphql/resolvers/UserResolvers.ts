import { IResolvers } from '@graphql-tools/utils';

import { AuthResponse, User, MutationRegisterArgs, QueryLoginArgs, QueryUserArgs } from '../generated';

const UserResolvers: IResolvers = {
  Query: {
    async login(parent: void, args: QueryLoginArgs, context): Promise<AuthResponse> {
      const { login, password } = args;
      return {
        token: 'token',
      };
    },

    async users(parent, args, context): Promise<User[]> {
      const { models } = context;
      return await models.User.findAll();
    },

    async user(parent: void, args: QueryUserArgs, context): Promise<User> {
      const { id } = args;
      const { models } = context;
      return await models.User.findByPk(id);
    },

    async me(parent, args, context): Promise<User> {
      const { models, me } = context;
      return await models.User.findByPk(me?.id);
    },
  },

  Mutation: {
    async register(parent: void, args: MutationRegisterArgs, context): Promise<AuthResponse> {
      const { email, username, password } = args;
      return {
        token: 'token',
      };
    },
  },
};

export default UserResolvers;
