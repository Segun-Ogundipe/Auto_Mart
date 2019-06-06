'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _orderModel = require('../models/orderModel');

var _orderModel2 = _interopRequireDefault(_orderModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orders = [];

var order = new _orderModel2.default(1, 1, 1, 150000);
orders.push(order);

exports.default = orders;