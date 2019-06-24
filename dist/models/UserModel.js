'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

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
    this.registeredOn = new Date();
  }

  _createClass(User, [{
    key: 'setUserWithBody',
    value: function setUserWithBody(body) {
      this.email = body.email;
      this.firstName = body.firstName;
      this.lastName = body.lastName;
      this.gender = body.gender;
      this.password = (0, _bcrypt.hashSync)(body.password, (0, _bcrypt.genSaltSync)(10));
      this.address = body.address;
      this.isAdmin = body.isAdmin;
    }
  }, {
    key: 'getUserAsArray',
    value: function getUserAsArray() {
      return [this.email, this.firstName, this.lastName, this.address, this.password, this.gender, this.isAdmin, this.registeredOn];
    }
  }]);

  return User;
}();

exports.default = User;