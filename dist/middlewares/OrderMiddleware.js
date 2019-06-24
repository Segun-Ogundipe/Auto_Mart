'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

var _OrderService = require('../services/OrderService');

var _OrderService2 = _interopRequireDefault(_OrderService);

var _CarService = require('../services/CarService');

var _CarService2 = _interopRequireDefault(_CarService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderMiddleware = function () {
  function OrderMiddleware() {
    _classCallCheck(this, OrderMiddleware);
  }

  _createClass(OrderMiddleware, null, [{
    key: 'validateCreate',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var _req$body, buyer, carId, amount, TokenUser, car;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, buyer = _req$body.buyer, carId = _req$body.carId, amount = _req$body.amount, TokenUser = _req$body.TokenUser;
                _context.next = 4;
                return _CarService2.default.findCarById(carId);

              case 4:
                car = _context.sent;

                if (!(buyer === undefined)) {
                  _context.next = 9;
                  break;
                }

                throw new _ErrorClass2.default(400, 'buyer field is required');

              case 9:
                if (!(typeof buyer !== 'number')) {
                  _context.next = 13;
                  break;
                }

                throw new _ErrorClass2.default(400, 'buyer must be a number');

              case 13:
                if (!(carId === undefined)) {
                  _context.next = 17;
                  break;
                }

                throw new _ErrorClass2.default(400, 'carId field is required');

              case 17:
                if (!(typeof carId !== 'number')) {
                  _context.next = 21;
                  break;
                }

                throw new _ErrorClass2.default(400, 'carId must be a number');

              case 21:
                if (!(amount === undefined)) {
                  _context.next = 25;
                  break;
                }

                throw new _ErrorClass2.default(400, 'amount field is required');

              case 25:
                if (!(typeof amount !== 'number')) {
                  _context.next = 29;
                  break;
                }

                throw new _ErrorClass2.default(400, 'amount must be a number');

              case 29:
                if (!(car.length < 1)) {
                  _context.next = 33;
                  break;
                }

                throw new _ErrorClass2.default(404, 'Car with id: ' + carId + ' does not exist');

              case 33:
                if (!(TokenUser.id !== buyer)) {
                  _context.next = 37;
                  break;
                }

                throw new _ErrorClass2.default(400, 'Logged in user must be the buyer');

              case 37:
                if (!(TokenUser.id === car[0].userId)) {
                  _context.next = 39;
                  break;
                }

                throw new _ErrorClass2.default(400, 'Logged in user can\'t make a purhase order for his/her own AD');

              case 39:

                req.body.Car = car[0];
                next();
                _context.next = 46;
                break;

              case 43:
                _context.prev = 43;
                _context.t0 = _context['catch'](0);

                res.status(_context.t0.status || 500).json(new _ErrorModel2.default(_context.t0.status || 500, _context.t0.message));

              case 46:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 43]]);
      }));

      function validateCreate(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return validateCreate;
    }()
  }, {
    key: 'validateUpdate',
    value: function validateUpdate(req, res, next) {
      try {
        var price = req.body.price;


        if (price === undefined) {
          throw new _ErrorClass2.default(400, 'price field is required');
        } else if (typeof price !== 'number') {
          throw new _ErrorClass2.default(400, 'price must be a number');
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'validateBuyer',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        var id, TokenUser, Order;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                id = parseInt(req.params.orderId, 10);
                TokenUser = req.body.TokenUser;

                if (!isNaN(id)) {
                  _context2.next = 5;
                  break;
                }

                throw new _ErrorClass2.default(400, 'OrderId must be a number');

              case 5:
                _context2.next = 7;
                return _OrderService2.default.findOrderById(id);

              case 7:
                Order = _context2.sent;

                if (!(Order.length < 1)) {
                  _context2.next = 10;
                  break;
                }

                throw new _ErrorClass2.default(404, 'Order with id: ' + id + ' does not exist');

              case 10:
                if (!(TokenUser.id !== Order[0].userId)) {
                  _context2.next = 12;
                  break;
                }

                throw new _ErrorClass2.default(401, 'Buyer is not a match with the logged in User');

              case 12:
                if (!(Order[0].status !== 'pending')) {
                  _context2.next = 14;
                  break;
                }

                throw new _ErrorClass2.default(400, 'Order with id: ' + id + ' has either been accepted or rejected, The price cannot be updated');

              case 14:

                req.body.Order = Order[0];

                next();
                _context2.next = 21;
                break;

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2['catch'](0);

                res.status(_context2.t0.status || 500).json(new _ErrorModel2.default(_context2.t0.status || 500, _context2.t0.message));

              case 21:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 18]]);
      }));

      function validateBuyer(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return validateBuyer;
    }()
  }]);

  return OrderMiddleware;
}();

exports.default = OrderMiddleware;