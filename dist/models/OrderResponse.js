"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderResponse = function () {
  function OrderResponse(isUpdate, Order, Car, oldPrice) {
    _classCallCheck(this, OrderResponse);

    this.id = Order.getId();
    this.carId = Car.getId();
    this.createdOn = Order.getCreatedOn();
    this.updatedOn = Order.getUpdatedOn();
    this.status = Order.getStatus();
    this.price = Car.getPrice();
    if (isUpdate === false) {
      this.priceOffered = Order.getAmount();
    } else {
      this.oldPriceOffered = oldPrice;
      this.newPriceOffered = Order.getAmount();
    }
  }

  _createClass(OrderResponse, [{
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }, {
    key: "getCarId",
    value: function getCarId() {
      return this.carId;
    }
  }, {
    key: "getCreatedOn",
    value: function getCreatedOn() {
      return this.createdOn;
    }
  }, {
    key: "getUpdatedOn",
    value: function getUpdatedOn() {
      return this.updatedOn;
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.status;
    }
  }, {
    key: "getPrice",
    value: function getPrice() {
      return this.price;
    }
  }, {
    key: "getPriceOffered",
    value: function getPriceOffered() {
      return this.priceOffered;
    }
  }, {
    key: "getOldPriceOffered",
    value: function getOldPriceOffered() {
      return this.oldPriceOffered;
    }
  }, {
    key: "getNewPriceOffered",
    value: function getNewPriceOffered() {
      return this.newPriceOffered;
    }
  }, {
    key: "setId",
    value: function setId(id) {
      this.id = id;
    }
  }, {
    key: "setCarId",
    value: function setCarId(carId) {
      this.carId = carId;
    }
  }, {
    key: "setCreatedOn",
    value: function setCreatedOn(createdOn) {
      this.createdOn = createdOn;
    }
  }, {
    key: "setUpdatedOn",
    value: function setUpdatedOn(updatedOn) {
      this.updatedOn = updatedOn;
    }
  }, {
    key: "setStatus",
    value: function setStatus(status) {
      this.status = status;
    }
  }, {
    key: "setPrice",
    value: function setPrice(price) {
      this.price = price;
    }
  }, {
    key: "setNewPriceOffered",
    value: function setNewPriceOffered(newPriceOffered) {
      this.newPriceOffered = newPriceOffered;
    }
  }, {
    key: "setPriceOffered",
    value: function setPriceOffered(priceOffered) {
      this.priceOffered = priceOffered;
    }
  }, {
    key: "setOldPriceOffered",
    value: function setOldPriceOffered(oldPriceOffered) {
      this.oldPriceOffered = oldPriceOffered;
    }
  }]);

  return OrderResponse;
}();

exports.default = OrderResponse;