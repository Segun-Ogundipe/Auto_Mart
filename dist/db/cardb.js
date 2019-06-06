'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _carModel = require('../models/carModel');

var _carModel2 = _interopRequireDefault(_carModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cars = [];

var car = new _carModel2.default(1, 1, 'new', 100000, 'Toyota', 'Z60', 'Truck', 'http://res.cloudinary.com/phenom/image/upload/v1559766698/AutoMart/2019-06-05T20:32:05.292Z.jpg');
cars.push(car);

exports.default = cars;