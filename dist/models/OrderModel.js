'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Order = function Order(id, buyer, carId, amount) {
  _classCallCheck(this, Order);

  this.id = id;
  this.buyer = buyer;
  this.createdOn = new Date().toLocaleString();
  this.updatedOn = '';
  this.carId = carId;
  this.amount = amount;
  this.status = 'pending';
};

exports.default = Order;