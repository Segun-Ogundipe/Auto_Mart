'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _bcrypt = require('bcrypt');

var _validators = require('../helpers/validators');

var _validators2 = _interopRequireDefault(_validators);

var _userdb = require('../db/userdb');

var _userdb2 = _interopRequireDefault(_userdb);

var _SuccessModel = require('../models/SuccessModel');

var _SuccessModel2 = _interopRequireDefault(_SuccessModel);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

var _middleware = require('../helpers/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _UserResponse = require('../models/UserResponse');

var _UserResponse2 = _interopRequireDefault(_UserResponse);

var _UserService = require('../services/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'create',
    value: function create(req, res) {
      var body = req.body;

      var user = null;

      if (!_validators2.default.isValidUser(body)) {
        res.status(400).json(new _ErrorModel2.default(400, 'The request body is malformed'));
      } else if (!_validators2.default.isValidEmail(body.email)) {
        res.status(400).json(new _ErrorModel2.default(400, 'The email: ' + body.email + ' is not valid'));
      } else if (!_validators2.default.isValidPassword(body.password)) {
        res.status(400).json(new _ErrorModel2.default(400, 'The password is too short'));
      } else if (_validators2.default.isDuplicatedUser(_userdb2.default, body.email)) {
        res.status(409).json(new _ErrorModel2.default(409, 'User with email: ' + body.email + ' already exist'));
      } else {
        user = _UserService2.default.createUser(body);

        var token = new _middleware2.default().generateToken(user.getEmail());

        res.status(201).json(new _SuccessModel2.default(201, new _UserResponse2.default(user, token)));
      }
    }
  }, {
    key: 'signin',
    value: function signin(req, res) {
      var body = req.body;

      var user = null;

      if (!_validators2.default.isValidLogin(body)) {
        res.status(400).json(new _ErrorModel2.default(400, 'The request body is malformed'));
      } else if (!_validators2.default.isValidEmail(body.email)) {
        res.status(400).json(new _ErrorModel2.default(400, 'The email: ' + body.email + ' is not valid'));
      } else if (!_validators2.default.isValidPassword(body.password)) {
        res.status(400).json(new _ErrorModel2.default(400, 'The password is too short'));
      } else {
        user = _UserService2.default.findUserByEmail(body.email, _userdb2.default);
        if (user === null) {
          res.status(422).json(new _ErrorModel2.default(422, 'The email is not associated with any user'));
        } else if (user !== null) {
          if ((0, _bcrypt.compareSync)(body.password, user.password)) {
            var token = new _middleware2.default().generateToken(user.getEmail());

            res.status(200).json(new _SuccessModel2.default(200, new _UserResponse2.default(user, token)));
          } else {
            res.status(422).json(new _ErrorModel2.default(422, 'The password is incorrect'));
          }
        }
      }
    }
  }]);

  return UserController;
}();

exports.default = UserController;