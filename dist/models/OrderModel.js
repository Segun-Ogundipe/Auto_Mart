'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Order = function () {
  function Order(id, buyer, carId, amount) {
    _classCallCheck(this, Order);

    this.id = id;
    this.buyer = buyer;
    this.createdOn = new Date().toLocaleString();
    this.updatedOn = '';
    this.carId = carId;
    this.amount = amount;
    this.status = 'pending';
  }

  _createClass(Order, [{
    key: 'getId',
    value: function getId() {
      return this.id;
    }
  }, {
    key: 'getBuyer',
    value: function getBuyer() {
      return this.buyer;
    }
  }, {
    key: 'getCreatedOn',
    value: function getCreatedOn() {
      return this.createdOn;
    }
  }, {
    key: 'getUpdatedOn',
    value: function getUpdatedOn() {
      return this.updatedOn;
    }
  }, {
    key: 'getCarId',
    value: function getCarId() {
      return this.carId;
    }
  }, {
    key: 'getAmount',
    value: function getAmount() {
      return this.amount;
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      return this.status;
    }
  }, {
    key: 'setId',
    value: function setId(id) {
      this.id = id;
    }
  }, {
    key: 'setBuyer',
    value: function setBuyer(buyer) {
      this.buyer = buyer;
    }
  }, {
    key: 'setCreatedOn',
    value: function setCreatedOn(createdOn) {
      this.createdOn = createdOn;
    }
  }, {
    key: 'setUpdatedOn',
    value: function setUpdatedOn(updatedOn) {
      this.updatedOn = updatedOn;
    }
  }, {
    key: 'setCarId',
    value: function setCarId(carId) {
      this.carId = carId;
    }
  }, {
    key: 'setAmount',
    value: function setAmount(amount) {
      this.amount = amount;
    }
  }, {
    key: 'setStatus',
    value: function setStatus(status) {
      this.status = status;
    }
  }]);

  return Order;
}();

exports.default = Order;