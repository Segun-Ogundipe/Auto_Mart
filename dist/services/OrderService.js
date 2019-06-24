'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _OrderModel = require('../models/OrderModel');

var _OrderModel2 = _interopRequireDefault(_OrderModel);

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderService = function () {
  function OrderService() {
    _classCallCheck(this, OrderService);
  }

  _createClass(OrderService, null, [{
    key: 'createOrder',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(body) {
        var query, OrderData, order;
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
                query = 'INSERT INTO orders("userId", "carId", amount, status, "createdOn") VALUES($1, $2, $3, $4, $5) RETURNING *';
                OrderData = new _OrderModel2.default();

                OrderData.setOrderWithBody(body);

                _context.next = 7;
                return _index2.default.query(query, OrderData.getOrderAsArray());

              case 7:
                order = _context.sent;
                return _context.abrupt('return', order[0]);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createOrder(_x) {
        return _ref.apply(this, arguments);
      }

      return createOrder;
    }()
  }, {
    key: 'updateOrder',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(OrderObject, price) {
        var query, updatedOn, order;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = 'UPDATE orders SET amount=$1, "updatedOn"=$2 WHERE id=$3 RETURNING *';
                updatedOn = new Date();
                _context2.next = 4;
                return _index2.default.query(query, [price, updatedOn, OrderObject.id]);

              case 4:
                order = _context2.sent;
                return _context2.abrupt('return', order[0]);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateOrder(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return updateOrder;
    }()
  }, {
    key: 'findOrderById',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(orderId) {
        var query, order;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(orderId === undefined)) {
                  _context3.next = 2;
                  break;
                }

                throw new _ErrorClass2.default(400, 'Please provide a valid orderId');

              case 2:
                query = 'SELECT * FROM orders WHERE id = $1';
                _context3.next = 5;
                return _index2.default.query(query, [orderId]);

              case 5:
                order = _context3.sent;
                return _context3.abrupt('return', order);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function findOrderById(_x4) {
        return _ref3.apply(this, arguments);
      }

      return findOrderById;
    }()
  }]);

  return OrderService;
}();

exports.default = OrderService;