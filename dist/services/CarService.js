'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('../helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

var _CarModel = require('../models/CarModel');

var _CarModel2 = _interopRequireDefault(_CarModel);

var _cardb = require('../db/cardb');

var _cardb2 = _interopRequireDefault(_cardb);

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable class-methods-use-this */
var CarService = function () {
  function CarService() {
    _classCallCheck(this, CarService);
  }

  _createClass(CarService, null, [{
    key: 'createCar',
    value: function createCar(body) {
      if (!body) {
        throw new _ErrorClass2.default(400, 'Body can\'t be empty');
      }
      var car = new _CarModel2.default();

      car.id = _helper2.default.getNewId(_cardb2.default);
      car.owner = body.owner;
      car.state = body.state;
      car.price = body.price;
      car.manufacturer = body.manufacturer;
      car.model = body.model;
      car.bodyType = body.bodyType;
      car.imageUrl = body.image;

      _cardb2.default.push(car);

      return car;
    }
  }, {
    key: 'updateCar',
    value: function updateCar(carId, _ref) {
      var status = _ref.status,
          price = _ref.price;

      if (!carId) {
        throw new _ErrorClass2.default(400, 'Please provide carID');
      }

      var car = this.findCarById(carId);

      if (status) {
        if (car !== null && car.status === 'available') {
          car.status = status;

          _cardb2.default.forEach(function (value, index) {
            if (value.id === car.id) {
              _cardb2.default.splice(index, 1, car);
            }
          });
        }
      }

      if (price) {
        if (car !== null) {
          car.price = price;

          _cardb2.default.forEach(function (value, index) {
            if (value.id === car.id) {
              _cardb2.default.splice(index, 1, car);
            }
          });
        }
      }

      return car;
    }
  }, {
    key: 'findCarById',
    value: function findCarById(id) {
      if (!id) {
        throw new _ErrorClass2.default(400, 'Please provide a valid id');
      }
      var car = null;

      _cardb2.default.forEach(function (value) {
        if (value.id === parseInt(id, 10)) {
          car = value;
        }
      });

      return car;
    }
  }, {
    key: 'findByStatus',
    value: function findByStatus(status) {
      var carsArray = _cardb2.default.filter(function (value) {
        return value.status === status;
      });

      return carsArray;
    }
  }, {
    key: 'findByStatusAndPriceRange',
    value: function findByStatusAndPriceRange(status, minPrice, maxPrice) {
      var carsArray = _cardb2.default.filter(function (value) {
        return value.status === status && value.price >= minPrice && value.price <= maxPrice;
      });

      return carsArray;
    }
  }, {
    key: 'deleteCar',
    value: function deleteCar(carId) {
      if (!carId) {
        throw new _ErrorClass2.default(400, 'Please provide carID');
      }

      var car = this.findCarById(carId);

      if (car === null) {
        return false;
      }
      _cardb2.default.forEach(function (value, index) {
        if (value.id === car.id) {
          _cardb2.default.splice(index, 1);
        }
      });
      return true;
    }
  }, {
    key: 'findAll',
    value: function findAll() {
      return _cardb2.default;
    }
  }]);

  return CarService;
}();

exports.default = CarService;