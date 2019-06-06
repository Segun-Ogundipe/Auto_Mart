'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _UserModel = require('../models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

var _userdb = require('../db/userdb');

var _userdb2 = _interopRequireDefault(_userdb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable class-methods-use-this */
var UserService = function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, null, [{
    key: 'createUser',
    value: function createUser(body) {
      var user = new _UserModel2.default();

      user.setId(_helper2.default.getNewId(_userdb2.default));
      user.setEmail(body.email);
      user.setFirstName(body.firstName);
      user.setLastName(body.lastName);
      user.setGender(body.gender);
      user.setPassword((0, _bcrypt.hashSync)(body.password, (0, _bcrypt.genSaltSync)(10)));
      user.setAddress(body.address);
      user.setIsAdmin(body.isAdmin);

      _userdb2.default.push(user);

      return user;
    }
  }, {
    key: 'findUserByEmail',
    value: function findUserByEmail(email) {
      var user = null;

      _userdb2.default.forEach(function (value) {
        if (value.getEmail() === email) {
          user = value;
        }
      });

      return user;
    }
  }, {
    key: 'findUserById',
    value: function findUserById(id) {
      var user = null;

      _userdb2.default.forEach(function (value) {
        if (value.getId() === parseInt(id, 10)) {
          user = value;
        }
      });

      return user;
    }
  }]);

  return UserService;
}();

exports.default = UserService;