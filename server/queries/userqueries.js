import users from '../db/userdp';

const findUserByEmail = (email) => {
  users.forEach((user) => {
    if (user.getEmail === email) {
      return user;
    }

    return null;
  });
};

export default findUserByEmail;
