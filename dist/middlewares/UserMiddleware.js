'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

var _userdb = require('../db/userdb');

var _userdb2 = _interopRequireDefault(_userdb);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserMiddleware = function () {
  function UserMiddleware() {
    _classCallCheck(this, UserMiddleware);
  }

  _createClass(UserMiddleware, null, [{
    key: 'validateSignup',
    value: function validateSignup(req, res, next) {
      try {
        if (!req.body) {
          throw new _ErrorClass2.default(400, 'body is required');
        } else if (!req.body.email) {
          throw new _ErrorClass2.default(400, 'email is required');
        } else if (!req.body.firstName) {
          throw new _ErrorClass2.default(400, 'firstName is required');
        } else if (!req.body.lastName) {
          throw new _ErrorClass2.default(400, 'lastName is required');
        } else if (!req.body.gender) {
          throw new _ErrorClass2.default(400, 'gender is required');
        } else if (!req.body.password) {
          throw new _ErrorClass2.default(400, 'password is required');
        } else if (!req.body.address) {
          throw new _ErrorClass2.default(400, 'address is required');
        } else if (!req.body.isAdmin) {
          throw new _ErrorClass2.default(400, 'isAdmin is required');
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'validateEmail',
    value: function validateEmail(req, res, next) {
      try {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(req.body.email)) {
          throw new _ErrorClass2.default(400, 'The email: ' + req.body.email + ' is not valid');
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'validatePassword',
    value: function validatePassword(req, res, next) {
      try {
        var re = /^([a-zA-Z0-9@*#]{8,15})$/;
        if (!re.test(req.body.password)) {
          throw new _ErrorClass2.default(400, 'The password is not valid. Password must include alphanumeric characters and must consists of at least 8 characters and not more than 15 characters');
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'validateUser',
    value: function validateUser(req, res, next) {
      try {
        if (_userdb2.default.some(function (value) {
          return value.email === req.body.email;
        })) {
          throw new _ErrorClass2.default(409, 'User with email: ' + req.body.email + ' already exist');
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'validateLogin',
    value: function validateLogin(req, res, next) {
      try {
        if (!req.body) {
          throw new _ErrorClass2.default(400, 'body is required');
        } else if (!req.body.email) {
          throw new _ErrorClass2.default(400, 'email is required');
        } else if (!req.body.password) {
          throw new _ErrorClass2.default(400, 'password is required');
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }]);

  return UserMiddleware;
}();

exports.default = UserMiddleware;