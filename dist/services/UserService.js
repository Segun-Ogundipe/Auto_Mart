'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _UserModel = require('../models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable class-methods-use-this */
var UserService = function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, null, [{
    key: 'createUser',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(body) {
        var query, UserData, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(body === undefined)) {
                  _context.next = 2;
                  break;
                }

                throw new _ErrorClass2.default(400, 'Body can\'t be empty');

              case 2:
                query = 'INSERT INTO users(email, "firstName", "lastName", address, password, gender, "isAdmin", "registeredOn") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
                UserData = new _UserModel2.default();


                UserData.setUserWithBody(body);

                _context.next = 7;
                return _index2.default.query(query, UserData.getUserAsArray());

              case 7:
                user = _context.sent;
                return _context.abrupt('return', user);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createUser(_x) {
        return _ref.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: 'findUserByEmail',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email) {
        var query, user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(email === undefined)) {
                  _context2.next = 2;
                  break;
                }

                throw new _ErrorClass2.default(400, 'Please provide a valid email');

              case 2:
                query = 'SELECT * FROM users WHERE email = $1';
                _context2.next = 5;
                return _index2.default.query(query, [email]);

              case 5:
                user = _context2.sent;
                return _context2.abrupt('return', user);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function findUserByEmail(_x2) {
        return _ref2.apply(this, arguments);
      }

      return findUserByEmail;
    }()
  }, {
    key: 'findUserById',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var query, user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = 'SELECT * FROM users WHERE id = $1';
                _context3.next = 3;
                return _index2.default.query(query, [id]);

              case 3:
                user = _context3.sent;
                return _context3.abrupt('return', user);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function findUserById(_x3) {
        return _ref3.apply(this, arguments);
      }

      return findUserById;
    }()
  }, {
    key: 'updatePassword',
    value: function updatePassword(email, newPassword) {
      var query = 'UPDATE users SET password=$1 WHERE email=$2';
      var password = (0, _bcrypt.hashSync)(newPassword, (0, _bcrypt.genSaltSync)(10));
      _index2.default.query(query, [password, email]);
    }
  }]);

  return UserService;
}();

exports.default = UserService;