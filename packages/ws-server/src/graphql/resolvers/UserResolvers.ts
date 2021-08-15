import { IResolvers } from '@graphql-tools/utils';
import { AuthenticationError, UserInputError } from 'apollo-server-errors';

import { AuthResponse, User, MutationRegisterArgs, QueryLoginArgs, QueryUserArgs } from '../generated';
import createToken from '../helpers/createToken';

const UserResolvers: IResolvers = {
  Query: {
    async login(parent: void, args: QueryLoginArgs, context): Promise<AuthResponse> {
      const { login, password } = args;
      const { models, secret } = context;

      const user = await models.User.findByLogin(login);
      if (!user) {
        throw new UserInputError('No user found with this login credential');
      }

      const isValid = await user.validatePassword(password);
      if (!isValid) {
        throw new AuthenticationError('Invalid password');
      }

      return { token: createToken(user, secret, '30m') };
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
      const { models, secret } = context;

      const user = await models.User.create({
        username,
        email,
        password,
      });

      return { token: createToken(user, secret, '30m') };
    },
  },
};

export default UserResolvers;
