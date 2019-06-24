'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _bcrypt = require('bcrypt');

var _SuccessModel = require('../models/SuccessModel');

var _SuccessModel2 = _interopRequireDefault(_SuccessModel);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

var _UserResponse = require('../models/UserResponse');

var _UserResponse2 = _interopRequireDefault(_UserResponse);

var _MailModel = require('../models/MailModel');

var _MailModel2 = _interopRequireDefault(_MailModel);

var _TokenMiddleware = require('../middlewares/TokenMiddleware');

var _TokenMiddleware2 = _interopRequireDefault(_TokenMiddleware);

var _UserService = require('../services/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

var _PasswordGenerator = require('../helpers/PasswordGenerator');

var _PasswordGenerator2 = _interopRequireDefault(_PasswordGenerator);

var _nodemailer = require('../helpers/nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'create',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var body, user, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                body = req.body;
                _context.next = 4;
                return _UserService2.default.createUser(body);

              case 4:
                user = _context.sent;
                token = _TokenMiddleware2.default.generateToken(user[0].email, user[0].password);


                res.status(201).json(new _SuccessModel2.default(201, new _UserResponse2.default(user[0], token)));
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

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'signin',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var body, user, token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                body = req.body;
                _context2.next = 4;
                return _UserService2.default.findUserByEmail(body.email);

              case 4:
                user = _context2.sent;

                if (!(user.length < 1)) {
                  _context2.next = 7;
                  break;
                }

                throw new _ErrorClass2.default(404, 'The email is not associated with any user');

              case 7:

                if ((0, _bcrypt.compareSync)(body.password, user[0].password)) {
                  token = _TokenMiddleware2.default.generateToken(user[0].email, user[0].password);


                  res.status(200).json(new _SuccessModel2.default(200, new _UserResponse2.default(user[0], token)));
                } else {
                  res.status(401).json(new _ErrorModel2.default(401, 'The password is incorrect'));
                }
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](0);

                res.status(_context2.t0.status || 500).json(new _ErrorModel2.default(_context2.t0.status || 500, _context2.t0.message));

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));

      function signin(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return signin;
    }()
  }, {
    key: 'updatePassword',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var email, _req$body, password, newPassword, TokenUser;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                email = req.params.email;
                _req$body = req.body, password = _req$body.password, newPassword = _req$body.newPassword, TokenUser = _req$body.TokenUser;

                if (!(0, _bcrypt.compareSync)(password, TokenUser.password)) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 6;
                return _UserService2.default.updatePassword(email, newPassword);

              case 6:

                res.status(204).send();
                _context3.next = 10;
                break;

              case 9:
                res.status(401).json(new _ErrorModel2.default(401, 'The password is incorrect'));

              case 10:
                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3['catch'](0);

                res.status(_context3.t0.status || 500).json(new _ErrorModel2.default(_context3.t0.status || 500, _context3.t0.message));

              case 15:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 12]]);
      }));

      function updatePassword(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return updatePassword;
    }()
  }, {
    key: 'resetPassword',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
        var email, _req$body2, password, newPassword, generatedPassword, mailOptions;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                email = req.params.email;
                _req$body2 = req.body, password = _req$body2.password, newPassword = _req$body2.newPassword;

                if (!(password === undefined && newPassword === undefined)) {
                  _context4.next = 13;
                  break;
                }

                generatedPassword = _PasswordGenerator2.default.generate();
                mailOptions = new _MailModel2.default(email, generatedPassword);
                _context4.next = 8;
                return _nodemailer2.default.sendMail(mailOptions);

              case 8:
                _context4.next = 10;
                return _UserService2.default.updatePassword(email, generatedPassword);

              case 10:

                res.status(204).send();
                _context4.next = 14;
                break;

              case 13:
                next();

              case 14:
                _context4.next = 19;
                break;

              case 16:
                _context4.prev = 16;
                _context4.t0 = _context4['catch'](0);

                res.status(_context4.t0.status || 500).json(new _ErrorModel2.default(_context4.t0.status || 500, _context4.t0.message));

              case 19:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 16]]);
      }));

      function resetPassword(_x7, _x8, _x9) {
        return _ref4.apply(this, arguments);
      }

      return resetPassword;
    }()
  }]);

  return UserController;
}();

exports.default = UserController;