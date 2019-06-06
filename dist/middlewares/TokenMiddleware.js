'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _properties = require('../config/properties');

var _properties2 = _interopRequireDefault(_properties);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TokenUtility = function () {
  function TokenUtility() {
    _classCallCheck(this, TokenUtility);
  }

  _createClass(TokenUtility, null, [{
    key: 'generateToken',
    value: function generateToken(email) {
      return _jsonwebtoken2.default.sign({ email: email }, _properties2.default.secret_key, { expiresIn: '24h' });
    }
  }, {
    key: 'checkToken',
    value: function checkToken(req, res, next) {
      try {
        var token = req.headers.authorization;
        if (token) {
          if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
          }

          _jsonwebtoken2.default.verify(token, _properties2.default.secret_key, function (err, decoded) {
            if (err) {
              res.status(401).json(new _ErrorModel2.default(401, 'Token Error: ' + err.message));
            } else {
              next();
            }
          });
        } else {
          res.status(401).json(new _ErrorModel2.default(401, 'Authorization token is empty. Please provide a valid token'));
        }
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }]);

  return TokenUtility;
}();

exports.default = TokenUtility;