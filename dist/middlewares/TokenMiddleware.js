'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */

// import dotenv from 'dotenv';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

var _UserService = require('../services/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// dotenv.config();
var secretKey = process.env.secretKey;

var TokenUtility = function () {
  function TokenUtility() {
    _classCallCheck(this, TokenUtility);
  }

  _createClass(TokenUtility, null, [{
    key: 'generateToken',
    value: function generateToken(email, password) {
      return _jsonwebtoken2.default.sign({ userId: email, pass: password }, secretKey, { expiresIn: '24h' });
    }
  }, {
    key: 'checkToken',
    value: function checkToken(req, res, next) {
      var _this = this;

      try {
        var token = req.headers.authorization;
        if (token) {
          if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
          }

          _jsonwebtoken2.default.verify(token, secretKey, function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, decoded) {
              var TokenUser;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;

                      if (!err) {
                        _context.next = 3;
                        break;
                      }

                      throw new _ErrorClass2.default(401, 'Token Error: ' + err.message);

                    case 3:
                      _context.next = 5;
                      return _UserService2.default.findUserByEmail(decoded.userId);

                    case 5:
                      TokenUser = _context.sent;

                      if (!(TokenUser.length < 1)) {
                        _context.next = 10;
                        break;
                      }

                      throw new _ErrorClass2.default(404, 'Token doesn\'t match any user');

                    case 10:
                      if (!(TokenUser[0].password !== decoded.pass)) {
                        _context.next = 12;
                        break;
                      }

                      throw new _ErrorClass2.default(401, 'Token no longer valid');

                    case 12:

                      req.body.TokenUser = TokenUser[0];
                      next();
                      _context.next = 19;
                      break;

                    case 16:
                      _context.prev = 16;
                      _context.t0 = _context['catch'](0);

                      res.status(_context.t0.status || 500).json(new _ErrorModel2.default(_context.t0.status || 500, _context.t0.message));

                    case 19:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this, [[0, 16]]);
            }));

            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }());
        } else {
          throw new _ErrorClass2.default(401, 'Authorization token is empty. Please provide a valid token');
        }
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }]);

  return TokenUtility;
}();

exports.default = TokenUtility;