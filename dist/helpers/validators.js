"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// eslint-disable-next-line no-useless-escape
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var isValidUser = function isValidUser(body) {
  if (!body) {
    return false;
  }
  if (!body.email || !body.firstName || !body.lastName || !body.gender || !body.password || !body.address || !body.isAdmin) {
    return false;
  }
  return true;
};

var isValidLogin = function isValidLogin(body) {
  if (!body) {
    return false;
  }
  if (!body.email || !body.password) {
    return false;
  }
  return true;
};

var isValidEmail = function isValidEmail(email) {
  return re.test(email);
};

var isValidPassword = function isValidPassword(password) {
  return password.length > 7;
};

var isDuplicatedUser = function isDuplicatedUser(users, email) {
  return users.some(function (user) {
    return user.email === email;
  });
};

var isValidCar = function isValidCar(body) {
  if (!body) {
    return false;
  }
  if (!body.owner || !body.state || !body.price || !body.manufacturer || !body.model || !body.bodyType) {
    return false;
  }
  return true;
};

var isValidOrder = function isValidOrder(body) {
  if (!body) {
    return false;
  }
  if (!body.buyer && !body.carId && !body.amount) {
    return false;
  }
  return true;
};

exports.default = {
  isValidEmail: isValidEmail,
  isValidUser: isValidUser,
  isValidPassword: isValidPassword,
  isDuplicatedUser: isDuplicatedUser,
  isValidLogin: isValidLogin,
  isValidCar: isValidCar,
  isValidOrder: isValidOrder
};