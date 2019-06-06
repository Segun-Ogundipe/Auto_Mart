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

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

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
      if (!body) {
        throw new _ErrorClass2.default(400, 'Body can\'t be empty');
      }

      var user = new _UserModel2.default();

      user.id = _helper2.default.getNewId(_userdb2.default);
      user.email = body.email;
      user.firstName = body.firstName;
      user.lastName = body.lastName;
      user.gender = body.gender;
      user.password = (0, _bcrypt.hashSync)(body.password, (0, _bcrypt.genSaltSync)(10));
      user.address = body.address;
      user.isAdmin = body.isAdmin;

      _userdb2.default.push(user);

      return user;
    }
  }, {
    key: 'findUserByEmail',
    value: function findUserByEmail(email) {
      if (!email) {
        throw new _ErrorClass2.default(400, 'Please provide a valid email');
      }

      var user = null;

      _userdb2.default.forEach(function (value) {
        if (value.email === email) {
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
        if (value.id === parseInt(id, 10)) {
          user = value;
        }
      });

      return user;
    }
  }]);

  return UserService;
}();

exports.default = UserService;