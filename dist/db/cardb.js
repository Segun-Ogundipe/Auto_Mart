'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CarModel = require('../models/CarModel');

var _CarModel2 = _interopRequireDefault(_CarModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cars = [];

var car = new _CarModel2.default(1, 1, 'new', 100000, 'Toyota', 'Z60', 'Truck', 'http://res.cloudinary.com/phenom/image/upload/v1559766698/AutoMart/2019-06-05T20:32:05.292Z.jpg');
cars.push(car);

exports.default = cars;