import jwt from 'jsonwebtoken';

import { User } from '../generated';

const createToken = (user: User, secret: string, expiresIn: string): string => {
  const { id, email, username } = user;
  return jwt.sign({ id, email, username }, secret, { expiresIn });
};

export default createToken;
