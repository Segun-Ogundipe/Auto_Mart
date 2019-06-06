'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Car = function Car(id, owner, state, price, manufacturer, model, bodyType, imageUrl) {
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
};

exports.default = Car;