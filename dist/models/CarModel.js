'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Car = function () {
  function Car(id, owner, state, price, manufacturer, model, bodyType, imageUrl) {
    _classCallCheck(this, Car);

    this.id = id;
    this.owner = owner;
    this.createdOn = new Date().toLocaleString();
    this.state = state;
    this.status = 'available';
    this.price = price;
    this.manufacturer = manufacturer;
    this.model = model;
    this.bodyType = bodyType;
    this.imageUrl = imageUrl;
  }

  _createClass(Car, [{
    key: 'getId',
    value: function getId() {
      return this.id;
    }
  }, {
    key: 'getOwner',
    value: function getOwner() {
      return this.owner;
    }
  }, {
    key: 'getCreatedOn',
    value: function getCreatedOn() {
      return this.createdOn;
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.state;
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      return this.status;
    }
  }, {
    key: 'getPrice',
    value: function getPrice() {
      return this.price;
    }
  }, {
    key: 'getManufacturer',
    value: function getManufacturer() {
      return this.manufacturer;
    }
  }, {
    key: 'getModel',
    value: function getModel() {
      return this.model;
    }
  }, {
    key: 'getBodyType',
    value: function getBodyType() {
      return this.bodyType;
    }
  }, {
    key: 'getImageUrl',
    value: function getImageUrl() {
      return this.imageUrl;
    }
  }, {
    key: 'setId',
    value: function setId(id) {
      this.id = id;
    }
  }, {
    key: 'setOwner',
    value: function setOwner(owner) {
      this.owner = owner;
    }
  }, {
    key: 'setCreatedOn',
    value: function setCreatedOn(createdOn) {
      this.createdOn = createdOn;
    }
  }, {
    key: 'setState',
    value: function setState(state) {
      this.state = state;
    }
  }, {
    key: 'setStatus',
    value: function setStatus(status) {
      this.status = status;
    }
  }, {
    key: 'setPrice',
    value: function setPrice(price) {
      this.price = price;
    }
  }, {
    key: 'setManufacturer',
    value: function setManufacturer(manufacturer) {
      this.manufacturer = manufacturer;
    }
  }, {
    key: 'setModel',
    value: function setModel(model) {
      this.model = model;
    }
  }, {
    key: 'setBodyType',
    value: function setBodyType(bodyType) {
      this.bodyType = bodyType;
    }
  }, {
    key: 'setImageUrl',
    value: function setImageUrl(imageUrl) {
      this.imageUrl = imageUrl;
    }
  }]);

  return Car;
}();

exports.default = Car;