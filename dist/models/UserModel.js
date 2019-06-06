"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(id, email, firstName, lastName, gender, password, address, isAdmin) {
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
  }

  _createClass(User, [{
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }, {
    key: "getEmail",
    value: function getEmail() {
      return this.email;
    }
  }, {
    key: "getFirstName",
    value: function getFirstName() {
      return this.firstName;
    }
  }, {
    key: "getLastName",
    value: function getLastName() {
      return this.lastName;
    }
  }, {
    key: "getGender",
    value: function getGender() {
      return this.gender;
    }
  }, {
    key: "getPassword",
    value: function getPassword() {
      return this.password;
    }
  }, {
    key: "getAddress",
    value: function getAddress() {
      return this.address;
    }
  }, {
    key: "getIsAdmin",
    value: function getIsAdmin() {
      return this.isAdmin;
    }
  }, {
    key: "getRegisteredOn",
    value: function getRegisteredOn() {
      return this.registeredOn;
    }
  }, {
    key: "setId",
    value: function setId(id) {
      this.id = id;
    }
  }, {
    key: "setEmail",
    value: function setEmail(email) {
      this.email = email;
    }
  }, {
    key: "setFirstName",
    value: function setFirstName(firstName) {
      this.firstName = firstName;
    }
  }, {
    key: "setLastName",
    value: function setLastName(lastName) {
      this.lastName = lastName;
    }
  }, {
    key: "setGender",
    value: function setGender(gender) {
      this.gender = gender;
    }
  }, {
    key: "setPassword",
    value: function setPassword(password) {
      this.password = password;
    }
  }, {
    key: "setAddress",
    value: function setAddress(address) {
      this.address = address;
    }
  }, {
    key: "setIsAdmin",
    value: function setIsAdmin(isAdmin) {
      this.isAdmin = isAdmin;
    }
  }, {
    key: "setRegisteredOn",
    value: function setRegisteredOn(registeredOn) {
      this.registeredOn = registeredOn;
    }
  }]);

  return User;
}();

exports.default = User;