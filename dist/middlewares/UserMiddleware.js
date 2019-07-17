'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _kickbox = require('kickbox');

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

var _UserService = require('../services/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var kickbox = (0, _kickbox.client)(process.env.API_KEY).kickbox();

var UserMiddleware = function () {
  function UserMiddleware() {
    _classCallCheck(this, UserMiddleware);
  }

  _createClass(UserMiddleware, null, [{
    key: 'validateSignup',
    value: function validateSignup(req, res, next) {
      try {
        var _req$body = req.body,
            email = _req$body.email,
            firstName = _req$body.firstName,
            lastName = _req$body.lastName,
            gender = _req$body.gender,
            password = _req$body.password,
            address = _req$body.address,
            isAdmin = _req$body.isAdmin;

        var nameRegEx = /^([A-Z][a-z]{2,})$/;
        var addressRegEx = /^[ \w]{3,}([A-Za-z]\.)?[ \w]{3,},\x20[A-Za-z]{2,}$/;

        if (email === undefined) {
          throw new _ErrorClass2.default(400, 'email is required');
        } else if (typeof email !== 'string') {
          throw new _ErrorClass2.default(400, 'email must be a string');
        } else if (firstName === undefined) {
          throw new _ErrorClass2.default(400, 'firstName is required');
        } else if (typeof firstName !== 'string') {
          throw new _ErrorClass2.default(400, 'firstName must be a string');
        } else if (!nameRegEx.test(firstName)) {
          throw new _ErrorClass2.default(400, 'firstName must be in this format \'Firstname\'');
        } else if (lastName === undefined) {
          throw new _ErrorClass2.default(400, 'lastName is required');
        } else if (typeof lastName !== 'string') {
          throw new _ErrorClass2.default(400, 'lastName must be a string');
        } else if (!nameRegEx.test(lastName)) {
          throw new _ErrorClass2.default(400, 'lastName must be in this format \'Lastname\'');
        } else if (gender === undefined) {
          throw new _ErrorClass2.default(400, 'gender is required');
        } else if (typeof gender !== 'string') {
          throw new _ErrorClass2.default(400, 'gender must be a string');
        } else if (gender !== 'MALE' && gender !== 'FEMALE') {
          throw new _ErrorClass2.default(400, 'gender value can either be MALE or FEMALE');
        } else if (password === undefined) {
          throw new _ErrorClass2.default(400, 'password is required');
        } else if (typeof password !== 'string') {
          throw new _ErrorClass2.default(400, 'password must be a string');
        } else if (address === undefined) {
          throw new _ErrorClass2.default(400, 'address is required');
        } else if (typeof address !== 'string') {
          throw new _ErrorClass2.default(400, 'address must be a string');
        } else if (!addressRegEx.test(address)) {
          throw new _ErrorClass2.default(400, 'address should be in this format \'123 Some Street. Agege Lagos, Nigeria\', \'12 Some Street off Some Street. Ikeja Lagos, NG\'');
        } else if (isAdmin === undefined) {
          throw new _ErrorClass2.default(400, 'isAdmin is required');
        } else if (typeof isAdmin !== 'boolean') {
          throw new _ErrorClass2.default(400, 'isAdmin must be a boolean');
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
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(req.body.email)) {
          throw new _ErrorClass2.default(400, 'The email: ' + req.body.email + ' is not valid');
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'verifyEmail',
    value: function verifyEmail(req, res, next) {
      try {
        kickbox.verify(req.body.email, function (err, response) {
          try {
            if (response.body.result !== 'deliverable') {
              throw new _ErrorClass2.default(400, 'Mails to ' + req.body.email + ' won\'t deliver. Please check your email or use another one');
            }
            next();
          } catch (error) {
            res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
          }
        });
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
          throw new _ErrorClass2.default(400, 'The password is not valid. password may include alphanumeric characters and must consists of at least 8 characters and not more than 15 characters');
        }
        if (req.body.newPassword !== undefined) {
          if (!re.test(req.body.newPassword)) {
            throw new _ErrorClass2.default(400, 'The password is not valid. newPassword may include alphanumeric characters and must consists of at least 8 characters and not more than 15 characters');
          }
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'validateUser',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _UserService2.default.findUserByEmail(req.body.email);

              case 3:
                user = _context.sent;

                if (!(user.length > 0)) {
                  _context.next = 6;
                  break;
                }

                throw new _ErrorClass2.default(409, 'User with email: ' + req.body.email + ' already exist');

              case 6:

                next();
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](0);

                res.status(_context.t0.status || 500).json(new _ErrorModel2.default(_context.t0.status || 500, _context.t0.message));

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function validateUser(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return validateUser;
    }()
  }, {
    key: 'validateLogin',
    value: function validateLogin(req, res, next) {
      try {
        var _req$body2 = req.body,
            email = _req$body2.email,
            password = _req$body2.password;


        if (email === undefined) {
          throw new _ErrorClass2.default(400, 'email is required');
        } else if (typeof email !== 'string') {
          throw new _ErrorClass2.default(400, 'email must be a string');
        } else if (password === undefined) {
          throw new _ErrorClass2.default(400, 'password is required');
        } else if (typeof password !== 'string') {
          throw new _ErrorClass2.default(400, 'password must be a string');
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'validateUpdateEmail',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        var email, re, user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                email = req.params.email;
                re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (re.test(email)) {
                  _context2.next = 5;
                  break;
                }

                throw new _ErrorClass2.default(400, 'The email: ' + email + ' is not valid');

              case 5:
                _context2.next = 7;
                return _UserService2.default.findUserByEmail(email);

              case 7:
                user = _context2.sent;

                if (!(user.length < 1)) {
                  _context2.next = 10;
                  break;
                }

                throw new _ErrorClass2.default(404, 'User with email:' + email + ' does not exist');

              case 10:

                next();
                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2['catch'](0);

                res.status(_context2.t0.status || 500).json(new _ErrorModel2.default(_context2.t0.status || 500, _context2.t0.message));

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 13]]);
      }));

      function validateUpdateEmail(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return validateUpdateEmail;
    }()
  }, {
    key: 'validatePasswordChange',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
        var _req$body3, password, newPassword, TokenUser;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _req$body3 = req.body, password = _req$body3.password, newPassword = _req$body3.newPassword, TokenUser = _req$body3.TokenUser;

                if (!(password === undefined)) {
                  _context3.next = 6;
                  break;
                }

                throw new _ErrorClass2.default(400, 'password field is required');

              case 6:
                if (!(typeof password !== 'string')) {
                  _context3.next = 10;
                  break;
                }

                throw new _ErrorClass2.default(400, 'password must be a string');

              case 10:
                if (!(newPassword === undefined)) {
                  _context3.next = 14;
                  break;
                }

                throw new _ErrorClass2.default(400, 'newPassword field is required');

              case 14:
                if (!(typeof newPassword !== 'string')) {
                  _context3.next = 18;
                  break;
                }

                throw new _ErrorClass2.default(400, 'newPassword must be a string');

              case 18:
                if (!(TokenUser.email !== req.params.email)) {
                  _context3.next = 20;
                  break;
                }

                throw new _ErrorClass2.default(401, 'Logged in user does not match with the email provided');

              case 20:

                next();
                _context3.next = 26;
                break;

              case 23:
                _context3.prev = 23;
                _context3.t0 = _context3['catch'](0);

                res.status(_context3.t0.status || 500).json(new _ErrorModel2.default(_context3.t0.status || 500, _context3.t0.message));

              case 26:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 23]]);
      }));

      function validatePasswordChange(_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      }

      return validatePasswordChange;
    }()
  }]);

  return UserMiddleware;
}();

exports.default = UserMiddleware;