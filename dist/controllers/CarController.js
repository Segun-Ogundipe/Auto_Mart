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

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarController = function () {
  function CarController() {
    _classCallCheck(this, CarController);
  }

  _createClass(CarController, null, [{
    key: 'create',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var body, User, Car;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                body = req.body;
                User = body.User;
                _context.next = 5;
                return _CarService2.default.createCar(body);

              case 5:
                Car = _context.sent;


                res.status(201).json(new _SuccessModel2.default(201, new _CarResponse2.default(false, Car, User)));
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](0);

                res.status(_context.t0.status || 500).json(new _ErrorModel2.default(_context.t0.status || 500, _context.t0.message));

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'updatePrice',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var carId, body, User, price, Car;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                carId = req.params.carId;
                body = req.body;
                User = body.User, price = body.price;
                _context2.next = 6;
                return _CarService2.default.updateCar(carId, { carPrice: price });

              case 6:
                Car = _context2.sent;


                res.status(200).json(new _SuccessModel2.default(200, new _CarResponse2.default(true, Car, User)));
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](0);

                res.status(_context2.t0.status || 500).json(new _ErrorModel2.default(_context2.t0.status || 500, _context2.t0.message));

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));

      function updatePrice(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return updatePrice;
    }()
  }, {
    key: 'updateStatus',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var body, Car, User, status, orderId;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                body = req.body;
                Car = body.Car;
                User = body.User, status = body.status, orderId = body.orderId;

                if (!(Car.status === 'sold')) {
                  _context3.next = 6;
                  break;
                }

                throw new _ErrorClass2.default(400, 'Car has already been sold');

              case 6:
                _context3.next = 8;
                return _CarService2.default.updateCar(Car.id, { carStatus: status, acceptedOrderId: orderId });

              case 8:
                Car = _context3.sent;


                res.status(200).json(new _SuccessModel2.default(200, new _CarResponse2.default(true, Car, User)));
                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3['catch'](0);

                res.status(_context3.t0.status || 500).json(new _ErrorModel2.default(_context3.t0.status || 500, _context3.t0.message));

              case 15:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 12]]);
      }));

      function updateStatus(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return updateStatus;
    }()
  }, {
    key: 'getCar',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var carId, Car, User;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                carId = req.params.carId;
                _context4.next = 4;
                return _CarService2.default.findCarById(carId);

              case 4:
                Car = _context4.sent;

                if (!(Car.length < 1)) {
                  _context4.next = 7;
                  break;
                }

                throw new _ErrorClass2.default(404, 'Car with id: ' + carId + ' does not exist');

              case 7:
                _context4.next = 9;
                return _UserService2.default.findUserById(Car[0].userId);

              case 9:
                User = _context4.sent;

                if (!(User.length < 1)) {
                  _context4.next = 12;
                  break;
                }

                throw new _ErrorClass2.default(404, 'User with id: ' + Car[0].userId + ' does not exist');

              case 12:

                res.status(200).json(new _SuccessModel2.default(200, new _CarResponse2.default(true, Car[0], User[0])));
                _context4.next = 18;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4['catch'](0);

                res.status(_context4.t0.status || 500).json(new _ErrorModel2.default(_context4.t0.status || 500, _context4.t0.message));

              case 18:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 15]]);
      }));

      function getCar(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return getCar;
    }()
  }, {
    key: 'getCarsByStatus',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var _req$query, status, minPrice, maxPrice, state, manufacturer, availableCars;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _req$query = req.query, status = _req$query.status, minPrice = _req$query.minPrice, maxPrice = _req$query.maxPrice, state = _req$query.state, manufacturer = _req$query.manufacturer;
                availableCars = [];

                if (!(status !== undefined)) {
                  _context5.next = 56;
                  break;
                }

                if (!(minPrice === undefined && maxPrice === undefined && state === undefined && manufacturer === undefined)) {
                  _context5.next = 10;
                  break;
                }

                _context5.next = 7;
                return _CarService2.default.findByStatus(status, {});

              case 7:
                availableCars = _context5.sent;
                _context5.next = 56;
                break;

              case 10:
                if (!(minPrice !== undefined && maxPrice !== undefined && state === undefined && manufacturer === undefined)) {
                  _context5.next = 16;
                  break;
                }

                _context5.next = 13;
                return _CarService2.default.findByStatus(status, { min: minPrice, max: maxPrice });

              case 13:
                availableCars = _context5.sent;
                _context5.next = 56;
                break;

              case 16:
                if (!(minPrice === undefined && maxPrice === undefined && state !== undefined && manufacturer === undefined)) {
                  _context5.next = 22;
                  break;
                }

                _context5.next = 19;
                return _CarService2.default.findByStatus(status, { state: state });

              case 19:
                availableCars = _context5.sent;
                _context5.next = 56;
                break;

              case 22:
                if (!(minPrice !== undefined && maxPrice === undefined && state === undefined && manufacturer === undefined)) {
                  _context5.next = 28;
                  break;
                }

                _context5.next = 25;
                return _CarService2.default.findByStatus(status, { min: minPrice });

              case 25:
                availableCars = _context5.sent;
                _context5.next = 56;
                break;

              case 28:
                if (!(minPrice === undefined && maxPrice !== undefined && state === undefined && manufacturer === undefined)) {
                  _context5.next = 34;
                  break;
                }

                _context5.next = 31;
                return _CarService2.default.findByStatus(status, { max: maxPrice });

              case 31:
                availableCars = _context5.sent;
                _context5.next = 56;
                break;

              case 34:
                if (!(minPrice !== undefined && maxPrice !== undefined && state !== undefined && manufacturer === undefined)) {
                  _context5.next = 40;
                  break;
                }

                _context5.next = 37;
                return _CarService2.default.findByStatus(status, { min: minPrice, max: maxPrice, state: state });

              case 37:
                availableCars = _context5.sent;
                _context5.next = 56;
                break;

              case 40:
                if (!(minPrice !== undefined && maxPrice === undefined && state !== undefined && manufacturer === undefined)) {
                  _context5.next = 46;
                  break;
                }

                _context5.next = 43;
                return _CarService2.default.findByStatus(status, { min: minPrice, state: state });

              case 43:
                availableCars = _context5.sent;
                _context5.next = 56;
                break;

              case 46:
                if (!(minPrice === undefined && maxPrice !== undefined && state !== undefined && manufacturer === undefined)) {
                  _context5.next = 52;
                  break;
                }

                _context5.next = 49;
                return _CarService2.default.findByStatus(status, { max: maxPrice, state: state });

              case 49:
                availableCars = _context5.sent;
                _context5.next = 56;
                break;

              case 52:
                if (!(minPrice === undefined && maxPrice === undefined && state === undefined && manufacturer !== undefined)) {
                  _context5.next = 56;
                  break;
                }

                _context5.next = 55;
                return _CarService2.default.findByStatus(status, { manufacturer: manufacturer });

              case 55:
                availableCars = _context5.sent;

              case 56:
                if (!(availableCars.length < 1)) {
                  _context5.next = 58;
                  break;
                }

                throw new _ErrorClass2.default(404, 'No car matches your search parameter[s]');

              case 58:
                _context5.t0 = res.status(200);
                _context5.t1 = _SuccessModel2.default;
                _context5.next = 62;
                return _CarResponse2.default.setResponseFromCarArray(availableCars);

              case 62:
                _context5.t2 = _context5.sent;
                _context5.t3 = new _context5.t1(200, _context5.t2);

                _context5.t0.json.call(_context5.t0, _context5.t3);

                _context5.next = 70;
                break;

              case 67:
                _context5.prev = 67;
                _context5.t4 = _context5['catch'](0);

                res.status(_context5.t4.status || 500).json(new _ErrorModel2.default(_context5.t4.status || 500, _context5.t4.message));

              case 70:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 67]]);
      }));

      function getCarsByStatus(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return getCarsByStatus;
    }()
  }, {
    key: 'delete',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var carId, car;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                carId = req.params.carId;
                _context6.next = 4;
                return _CarService2.default.findCarById(carId);

              case 4:
                car = _context6.sent;

                if (!(car.length < 1)) {
                  _context6.next = 7;
                  break;
                }

                throw new _ErrorClass2.default(404, 'Car with id: ' + carId + ' does not exist');

              case 7:

                _CarService2.default.deleteCar(carId);

                res.status(204).send();
                _context6.next = 14;
                break;

              case 11:
                _context6.prev = 11;
                _context6.t0 = _context6['catch'](0);

                res.status(_context6.t0.status || 500).json(new _ErrorModel2.default(_context6.t0.status || 500, _context6.t0.message));

              case 14:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 11]]);
      }));

      function _delete(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: 'getAll',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var carsArray;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return _CarService2.default.findAll();

              case 3:
                carsArray = _context7.sent;

                if (!(carsArray.length < 1)) {
                  _context7.next = 8;
                  break;
                }

                res.status(200).json(new _SuccessModel2.default(200, 'There are no sold or available cars'));
                _context7.next = 15;
                break;

              case 8:
                _context7.t0 = res.status(200);
                _context7.t1 = _SuccessModel2.default;
                _context7.next = 12;
                return _CarResponse2.default.setResponseFromCarArray(carsArray);

              case 12:
                _context7.t2 = _context7.sent;
                _context7.t3 = new _context7.t1(200, _context7.t2);

                _context7.t0.json.call(_context7.t0, _context7.t3);

              case 15:
                _context7.next = 20;
                break;

              case 17:
                _context7.prev = 17;
                _context7.t4 = _context7['catch'](0);

                res.status(_context7.t4.status || 500).json(new _ErrorModel2.default(_context7.t4.status || 500, _context7.t4.message));

              case 20:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 17]]);
      }));

      function getAll(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return getAll;
    }()
  }]);

  return CarController;
}();

exports.default = CarController;