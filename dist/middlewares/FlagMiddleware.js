'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

var _CarService = require('../services/CarService');

var _CarService2 = _interopRequireDefault(_CarService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlagMiddleware = function () {
  function FlagMiddleware() {
    _classCallCheck(this, FlagMiddleware);
  }

  _createClass(FlagMiddleware, null, [{
    key: 'validateFlag',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var _req$body, carId, reason, description, Car;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, carId = _req$body.carId, reason = _req$body.reason, description = _req$body.description;

                if (!(carId === undefined)) {
                  _context.next = 6;
                  break;
                }

                throw new _ErrorClass2.default(400, 'carId field is required');

              case 6:
                if (!(typeof carId !== 'number')) {
                  _context.next = 10;
                  break;
                }

                throw new _ErrorClass2.default(400, 'carId must be a number');

              case 10:
                if (!(reason === undefined)) {
                  _context.next = 14;
                  break;
                }

                throw new _ErrorClass2.default(400, 'reason field is required');

              case 14:
                if (!(typeof reason !== 'string')) {
                  _context.next = 18;
                  break;
                }

                throw new _ErrorClass2.default(400, 'reason must be a strimg');

              case 18:
                if (!(description === undefined)) {
                  _context.next = 22;
                  break;
                }

                throw new _ErrorClass2.default(400, 'description field is required');

              case 22:
                if (!(typeof description !== 'string')) {
                  _context.next = 24;
                  break;
                }

                throw new _ErrorClass2.default(400, 'description must be a strimg');

              case 24:
                _context.next = 26;
                return _CarService2.default.findCarById(carId);

              case 26:
                Car = _context.sent;

                if (!(Car.length < 1)) {
                  _context.next = 29;
                  break;
                }

                throw new _ErrorClass2.default(404, 'Car with id: ' + carId + ' does not exist');

              case 29:

                next();
                _context.next = 35;
                break;

              case 32:
                _context.prev = 32;
                _context.t0 = _context['catch'](0);

                res.status(_context.t0.status || 500).json(new _ErrorModel2.default(_context.t0.status || 500, _context.t0.message));

              case 35:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 32]]);
      }));

      function validateFlag(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return validateFlag;
    }()
  }]);

  return FlagMiddleware;
}();

exports.default = FlagMiddleware;