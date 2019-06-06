"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarResponse = function CarResponse(Car, User) {
  _classCallCheck(this, CarResponse);

  this.id = Car.id;
  this.email = User.email;
  this.createdOn = Car.createdOn;
  this.manufacturer = Car.manufacturer;
  this.model = Car.model;
  this.price = Car.price;
  this.state = Car.state;
  this.status = Car.status;
  this.bodyType = Car.bodyType;
  this.imageUrl = Car.imageUrl;
};

exports.default = CarResponse;