'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _OrderModel = require('../models/OrderModel');

var _OrderModel2 = _interopRequireDefault(_OrderModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orders = [];

var order = new _OrderModel2.default(1, 1, 1, 150000);
orders.push(order);

exports.default = orders;