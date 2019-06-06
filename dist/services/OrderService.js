'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _OrderModel = require('../models/OrderModel');

var _OrderModel2 = _interopRequireDefault(_OrderModel);

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

var _orderdb = require('../db/orderdb');

var _orderdb2 = _interopRequireDefault(_orderdb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderService = function () {
  function OrderService() {
    _classCallCheck(this, OrderService);
  }

  _createClass(OrderService, null, [{
    key: 'createOrder',
    value: function createOrder(body) {
      var order = new _OrderModel2.default();

      order.setId(_helper2.default.getNewId(_orderdb2.default));
      order.setBuyer(body.buyer);
      order.setCarId(body.carId);
      order.setAmount(body.amount);

      _orderdb2.default.push(order);

      return order;
    }
  }, {
    key: 'updateOrder',
    value: function updateOrder(orderId, price) {
      var order = null;
      order = this.findOrderById(orderId);
      if (order !== null && order.getStatus() === 'pending') {
        order.setAmount(price);
        order.setUpdatedOn(new Date().toLocaleString());

        _orderdb2.default.forEach(function (value, index) {
          if (value.getId() === order.getId()) {
            _orderdb2.default.splice(index, 1, order);
          }
        });
      }

      return order;
    }
  }, {
    key: 'findOrderById',
    value: function findOrderById(orderId) {
      var order = null;
      _orderdb2.default.forEach(function (orderObject) {
        if (orderObject.getId() === parseInt(orderId, 10)) {
          order = orderObject;
        }
      });

      return order;
    }
  }]);

  return OrderService;
}();

exports.default = OrderService;