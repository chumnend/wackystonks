import User from '../User';

export const createUsers = async (): Promise<void> => {
  await User.create({
    email: 'nicholas.chumney@outlook.com',
    username: 'chumnend',
    password: 'chumnend',
  });

  await User.create({
    email: 'david.baggins@gmail.com',
    username: 'dbagg1',
    password: 'dbagg1',
  });
};
