// eslint-disable-next-line no-useless-escape
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isValidUser = (body) => {
  if (!body) {
    return false;
  }
  if (!body.email || !body.firstName || !body.lastName
    || !body.gender || !body.password || !body.address || !body.isAdmin) {
    return false;
  }
  return true;
};

const isValidLogin = (body) => {
  if (!body) {
    return false;
  }
  if (!body.email || !body.password) {
    return false;
  }
  return true;
};

const isValidEmail = email => re.test(email);

const isValidPassword = password => password.length > 7;

const isDuplicatedUser = (users, email) => users.some(user => user.email === email);

const isValidCar = (body) => {
  if (!body) {
    return false;
  }
  if (!body.owner || !body.state || !body.status || !body.price
    || !body.manufacturer || !body.model || !body.bodyType) {
    return false;
  }
  return true;
};

const isValidOrder = (body) => {
  if (!body) {
    return false;
  }
  if (!body.buyer && !body.carId && !body.amount) {
    return false;
  }
  return true;
};

export default {
  isValidEmail,
  isValidUser,
  isValidPassword,
  isDuplicatedUser,
  isValidLogin,
  isValidCar,
  isValidOrder,
};
