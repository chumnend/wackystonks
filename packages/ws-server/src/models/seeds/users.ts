import User from '../User';

export const createUsers = async (): Promise<void> => {
  await User.create({
    id: 1,
    email: 'nicholas.chumney@outlook.com',
    username: 'chumnend',
  });

  await User.create({
    id: 2,
    email: 'david.baggins@gmail.com',
    username: 'dbagg',
  });
};
