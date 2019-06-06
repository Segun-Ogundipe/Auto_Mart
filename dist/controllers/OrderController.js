'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _validators = require('../helpers/validators');

var _validators2 = _interopRequireDefault(_validators);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

var _OrderService = require('../services/OrderService');

var _OrderService2 = _interopRequireDefault(_OrderService);

var _UserService = require('../services/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

var _CarService = require('../services/CarService');

var _CarService2 = _interopRequireDefault(_CarService);

var _SuccessModel = require('../models/SuccessModel');

var _SuccessModel2 = _interopRequireDefault(_SuccessModel);

var _OrderResponse = require('../models/OrderResponse');

var _OrderResponse2 = _interopRequireDefault(_OrderResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderController = function () {
  function OrderController() {
    _classCallCheck(this, OrderController);
  }

  _createClass(OrderController, null, [{
    key: 'create',
    value: function create(req, res) {
      var body = req.body;

      var Order = null;
      var Buyer = null;
      var Car = null;

      if (!_validators2.default.isValidOrder(body)) {
        res.status(400).json(new _ErrorModel2.default(400, 'The request body is malformed'));
      } else {
        Buyer = _UserService2.default.findUserById(body.buyer);
        Car = _CarService2.default.findCarById(body.carId);
        if (Buyer === null) {
          res.status(404).json(new _ErrorModel2.default(404, 'Buyer with id: ' + body.buyer + ' does not exist'));
        } else if (Car === null) {
          res.status(404).json(new _ErrorModel2.default(404, 'Car with id: ' + body.carId + ' does not exist'));
        } else {
          Order = _OrderService2.default.createOrder(body);

          res.status(201).json(new _SuccessModel2.default(201, new _OrderResponse2.default(false, Order, Car)));
        }
      }
    }
  }, {
    key: 'updateOrder',
    value: function updateOrder(req, res) {
      var id = req.params.orderId;
      var body = req.body;


      var Order = null;
      Order = _OrderService2.default.findOrderById(id);

      if (Order === null) {
        res.status(404).json(new _ErrorModel2.default(404, 'Order with id: ' + id + ' does not exist'));
      } else if (Order.getStatus() !== 'pending') {
        res.status(400).json(new _ErrorModel2.default(400, 'Order with id: ' + id + ' has either been accepted or rejected. The price can not be updated'));
      } else {
        var oldPrice = Order.getAmount();
        var Car = _CarService2.default.findCarById(Order.getCarId());
        Order = _OrderService2.default.updateOrder(id, body.price);
        res.status(200).json(new _SuccessModel2.default(200, new _OrderResponse2.default(true, Order, Car, oldPrice)));
      }
    }
  }]);

  return OrderController;
}();

exports.default = OrderController;