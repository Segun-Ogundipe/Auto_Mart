"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserResponse = function UserResponse(User, token) {
  _classCallCheck(this, UserResponse);

  this.token = token;
  this.id = User.id;
  this.email = User.email;
  this.firstName = User.firstName;
  this.lastName = User.lastName;
  this.gender = User.gender;
  this.address = User.address;
  this.isAdmin = User.isAdmin;
  this.registeredOn = User.registeredOn;
};

exports.default = UserResponse;