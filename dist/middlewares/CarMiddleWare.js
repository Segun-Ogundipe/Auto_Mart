'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarMiddleware = function () {
  function CarMiddleware() {
    _classCallCheck(this, CarMiddleware);
  }

  _createClass(CarMiddleware, null, [{
    key: 'validateCreate',
    value: function validateCreate(req, res, next) {
      try {
        if (!req.body) {
          throw new _ErrorClass2.default(400, 'body is required');
        } else if (!req.body.owner) {
          throw new _ErrorClass2.default(400, 'owner field is required');
        } else if (!req.body.state) {
          throw new _ErrorClass2.default(400, 'state field is required');
        } else if (!req.body.price) {
          throw new _ErrorClass2.default(400, 'price field is required');
        } else if (!req.body.manufacturer) {
          throw new _ErrorClass2.default(400, 'manufacturer field is required');
        } else if (!req.body.model) {
          throw new _ErrorClass2.default(400, 'model field is required');
        } else if (!req.body.bodyType) {
          throw new _ErrorClass2.default(400, 'bodyType field is required');
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }]);

  return CarMiddleware;
}();

exports.default = CarMiddleware;