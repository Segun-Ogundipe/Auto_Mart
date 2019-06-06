"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarResponse = function () {
  function CarResponse(Car, User) {
    _classCallCheck(this, CarResponse);

    this.id = Car.getId();
    this.email = User.getEmail();
    this.createdOn = Car.getCreatedOn();
    this.manufacturer = Car.getManufacturer();
    this.model = Car.getModel();
    this.price = Car.getPrice();
    this.state = Car.getState();
    this.status = Car.getStatus();
    this.bodyType = Car.getBodyType();
    this.imageUrl = Car.getImageUrl();
  }

  _createClass(CarResponse, [{
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }, {
    key: "getEmail",
    value: function getEmail() {
      return this.email;
    }
  }, {
    key: "getCreatedOn",
    value: function getCreatedOn() {
      return this.createdOn;
    }
  }, {
    key: "getManufacturer",
    value: function getManufacturer() {
      return this.manufacturer;
    }
  }, {
    key: "getModel",
    value: function getModel() {
      return this.model;
    }
  }, {
    key: "getPrice",
    value: function getPrice() {
      return this.price;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.status;
    }
  }, {
    key: "getBodyType",
    value: function getBodyType() {
      return this.bodyType;
    }
  }, {
    key: "getImageUrl",
    value: function getImageUrl() {
      return this.imageUrl;
    }
  }, {
    key: "setId",
    value: function setId(id) {
      this.id = id;
    }
  }, {
    key: "setEmail",
    value: function setEmail(email) {
      this.email = email;
    }
  }, {
    key: "setCreatedOn",
    value: function setCreatedOn(createdOn) {
      this.createdOn = createdOn;
    }
  }, {
    key: "setManufacturer",
    value: function setManufacturer(manufacturer) {
      this.manufacturer = manufacturer;
    }
  }, {
    key: "setModel",
    value: function setModel(model) {
      this.model = model;
    }
  }, {
    key: "setPrice",
    value: function setPrice(price) {
      this.price = price;
    }
  }, {
    key: "setState",
    value: function setState(state) {
      this.state = state;
    }
  }, {
    key: "setStatus",
    value: function setStatus(status) {
      this.status = status;
    }
  }, {
    key: "setBodyType",
    value: function setBodyType(bodyType) {
      this.bodyType = bodyType;
    }
  }, {
    key: "setImageUrl",
    value: function setImageUrl(imageUrl) {
      this.imageUrl = imageUrl;
    }
  }]);

  return CarResponse;
}();

exports.default = CarResponse;