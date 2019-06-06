'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _CarResponse = require('../models/CarResponse');

var _CarResponse2 = _interopRequireDefault(_CarResponse);

var _CarService = require('../services/CarService');

var _CarService2 = _interopRequireDefault(_CarService);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

var _SuccessModel = require('../models/SuccessModel');

var _SuccessModel2 = _interopRequireDefault(_SuccessModel);

var _UserService = require('../services/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarController = function () {
  function CarController() {
    _classCallCheck(this, CarController);
  }

  _createClass(CarController, null, [{
    key: 'create',
    value: function create(req, res) {
      try {
        var body = req.body;

        var Car = null;
        var User = null;

        User = _UserService2.default.findUserById(body.owner);
        if (User === null) {
          res.status(404).json(new _ErrorModel2.default(404, 'User with id: ' + body.owner + ' does not exist'));
        } else {
          Car = _CarService2.default.createCar(body);
          res.status(201).json(new _SuccessModel2.default(201, new _CarResponse2.default(Car, User)));
        }
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      try {
        var carId = req.params.carId;
        var body = req.body;

        var Car = _CarService2.default.findCarById(carId);
        var User = null;

        if (Car === null) {
          res.status(404).json(new _ErrorModel2.default(404, 'Car with id: ' + carId + ' does not exist'));
        } else {
          User = _UserService2.default.findUserById(Car.owner);

          if (User === null) {
            res.status(404).json(new _ErrorModel2.default(404, 'User with id: ' + Car.owner + ' does not exist'));
          } else {
            if (body.status) {
              Car = _CarService2.default.updateCar(carId, { status: body.status });
            }

            if (body.price) {
              Car = _CarService2.default.updateCar(carId, { price: body.price });
            }
            res.status(200).json(new _SuccessModel2.default(200, new _CarResponse2.default(Car, User)));
          }
        }
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'getCar',
    value: function getCar(req, res) {
      try {
        var id = req.params.carId;
        var Car = _CarService2.default.findCarById(id);
        var User = null;

        if (Car === null) {
          res.status(404).json(new _ErrorModel2.default(404, 'Car with id: ' + id + ' does not exist'));
        } else {
          User = _UserService2.default.findUserById(Car.owner);

          if (User === null) {
            res.status(404).json(new _ErrorModel2.default(404, 'User with id: ' + Car.owner + ' does not exist'));
          } else {
            res.status(200).json(new _SuccessModel2.default(200, new _CarResponse2.default(Car, User)));
          }
        }
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'getCarsByStatus',
    value: function getCarsByStatus(req, res) {
      try {
        var _req$query = req.query,
            status = _req$query.status,
            minPrice = _req$query.minPrice,
            maxPrice = _req$query.maxPrice;


        var availableCars = [];

        if (status && !minPrice && !maxPrice) {
          availableCars = _CarService2.default.findByStatus(status);
        }

        if (status && minPrice && maxPrice) {
          availableCars = _CarService2.default.findByStatusAndPriceRange(status, minPrice, maxPrice);
        }

        if (availableCars.length === 0) {
          res.status(200).json(new _SuccessModel2.default(200, 'No car matches your search parameter[s]'));
        } else {
          res.status(200).json(new _SuccessModel2.default(200, availableCars));
        }
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'delete',
    value: function _delete(req, res) {
      try {
        var carId = req.params.carId;

        var success = _CarService2.default.deleteCar(carId);

        if (success) {
          res.status(200).json(new _SuccessModel2.default(200, 'Car AD successfully deleted'));
        } else {
          res.status(404).json(new _ErrorModel2.default(404, 'Car with id: ' + carId + ' does not exist'));
        }
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'getAll',
    value: function getAll(req, res) {
      try {
        var carsArray = _CarService2.default.findAll();

        if (carsArray.length === 0) {
          res.status(200).json(new _SuccessModel2.default(200, 'There are no sold or available cars'));
        } else {
          res.status(200).json(new _SuccessModel2.default(200, carsArray));
        }
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }]);

  return CarController;
}();

exports.default = CarController;