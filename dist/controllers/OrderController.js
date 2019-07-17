'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

var _OrderService = require('../services/OrderService');

var _OrderService2 = _interopRequireDefault(_OrderService);

var _CarService = require('../services/CarService');

var _CarService2 = _interopRequireDefault(_CarService);

var _SuccessModel = require('../models/SuccessModel');

var _SuccessModel2 = _interopRequireDefault(_SuccessModel);

var _OrderResponse = require('../models/OrderResponse');

var _OrderResponse2 = _interopRequireDefault(_OrderResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderController = function () {
  function OrderController() {
    _classCallCheck(this, OrderController);
  }

  _createClass(OrderController, null, [{
    key: 'create',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var body, Order;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                body = req.body;
                Order = null;
                _context.next = 5;
                return _OrderService2.default.createOrder(body);

              case 5:
                Order = _context.sent;


                res.status(201).json(new _SuccessModel2.default(201, new _OrderResponse2.default(false, Order, body.Car)));
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
    key: 'updateOrder',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var body, Order, oldPrice, Car;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                body = req.body;
                Order = body.Order;
                oldPrice = Order.amount;
                _context2.next = 6;
                return _CarService2.default.findCarById(Order.carId);

              case 6:
                Car = _context2.sent;
                _context2.next = 9;
                return _OrderService2.default.updateOrder(Order, body.price);

              case 9:
                Order = _context2.sent;


                res.status(200).json(new _SuccessModel2.default(200, new _OrderResponse2.default(true, Order, Car[0], oldPrice)));
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

      function updateOrder(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return updateOrder;
    }()
  }]);

  return OrderController;
}();

exports.default = OrderController;