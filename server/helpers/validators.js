// eslint-disable-next-line no-useless-escape
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isValidUser = (body) => {
  if (!body) {
    return false;
  }
  if (!body.email && !body.first_name && !body.last_name
    && !body.gender && !body.password && !body.address && !body.is_admin) {
    return false;
  }
  return true;
};

const isValidEmail = email => re.test(email);

const isValidPassword = password => password.length > 7;

export default {
  isValidEmail, isValidUser, isValidPassword,
};
