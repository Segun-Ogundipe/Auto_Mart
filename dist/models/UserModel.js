"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(id, email, firstName, lastName, gender, password, address, isAdmin) {
  _classCallCheck(this, User);

  this.id = id;
  this.email = email;
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = gender;
  this.password = password;
  this.address = address;
  this.isAdmin = isAdmin;
  this.registeredOn = new Date().toLocaleString();
};

exports.default = User;