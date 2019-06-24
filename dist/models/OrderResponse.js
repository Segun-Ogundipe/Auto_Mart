"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderResponse = function OrderResponse(isUpdate, Order, Car, oldPrice) {
  _classCallCheck(this, OrderResponse);

  this.id = Order.id;
  this.carId = Car.id;
  this.buyer = Order.userId;
  this.status = Order.status;
  this.price = Car.price;
  if (isUpdate === false) {
    this.priceOffered = Order.amount;
  } else {
    this.oldPriceOffered = oldPrice;
    this.newPriceOffered = Order.amount;
    this.updatedOn = Order.updatedOn;
  }
  this.createdOn = Order.createdOn;
};

exports.default = OrderResponse;