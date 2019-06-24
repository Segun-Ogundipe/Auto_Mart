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
    this.state = state;
    this.status = 'available';
    this.price = price;
    this.manufacturer = manufacturer;
    this.model = model;
    this.bodyType = bodyType;
    this.imageUrl = imageUrl;
    this.createdOn = new Date();
    this.updatedOn = null;
  }

  _createClass(Car, [{
    key: 'setCarWithBody',
    value: function setCarWithBody(body) {
      this.owner = body.owner;
      this.state = body.state;
      this.price = body.price;
      this.manufacturer = body.manufacturer;
      this.model = body.model;
      this.bodyType = body.bodyType;
      this.imageUrl = body.image;
    }
  }, {
    key: 'getCarAsArray',
    value: function getCarAsArray() {
      return [this.owner, this.state, this.status, this.price, this.manufacturer, this.model, this.bodyType, this.imageUrl, this.createdOn];
    }
  }]);

  return Car;
}();

exports.default = Car;