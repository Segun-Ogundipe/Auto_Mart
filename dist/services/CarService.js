'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CarModel = require('../models/CarModel');

var _CarModel2 = _interopRequireDefault(_CarModel);

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable class-methods-use-this */
var CarService = function () {
  function CarService() {
    _classCallCheck(this, CarService);
  }

  _createClass(CarService, null, [{
    key: 'createCar',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(body) {
        var query, CarData, car;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(body === undefined)) {
                  _context.next = 2;
                  break;
                }

                throw new _ErrorClass2.default(400, 'Body can\'t be empty');

              case 2:
                query = 'INSERT INTO cars("userId", state, status, price, manufacturer, model, "bodyType", "imageUrl", "createdOn") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
                CarData = new _CarModel2.default();


                CarData.setCarWithBody(body);

                _context.next = 7;
                return _index2.default.query(query, CarData.getCarAsArray());

              case 7:
                car = _context.sent;
                return _context.abrupt('return', car[0]);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createCar(_x) {
        return _ref.apply(this, arguments);
      }

      return createCar;
    }()
  }, {
    key: 'updateCar',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(carId, _ref2) {
        var carStatus = _ref2.carStatus,
            acceptedOrderId = _ref2.acceptedOrderId,
            carPrice = _ref2.carPrice;

        var car, carQuery, updatedOn, acceptedQuery, query, _updatedOn;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                car = void 0;

                if (!carStatus) {
                  _context2.next = 9;
                  break;
                }

                carQuery = 'UPDATE cars SET status=$1, "updatedOn"=$2 WHERE id=$3 RETURNING *';
                updatedOn = new Date();
                _context2.next = 6;
                return _index2.default.query(carQuery, [carStatus, updatedOn, carId]);

              case 6:
                car = _context2.sent;
                acceptedQuery = 'UPDATE orders SET status=$1 WHERE id=$2';

                _index2.default.query(acceptedQuery, ['accepted', acceptedOrderId]);

              case 9:
                if (!carPrice) {
                  _context2.next = 15;
                  break;
                }

                query = 'UPDATE cars SET price=$1, "updatedOn"=$2 WHERE id=$3 RETURNING *';
                _updatedOn = new Date();
                _context2.next = 14;
                return _index2.default.query(query, [carPrice, _updatedOn, carId]);

              case 14:
                car = _context2.sent;

              case 15:
                return _context2.abrupt('return', car[0]);

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateCar(_x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return updateCar;
    }()
  }, {
    key: 'findCarById',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var query, car;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(id === undefined)) {
                  _context3.next = 2;
                  break;
                }

                throw new _ErrorClass2.default(400, 'Please provide a valid id');

              case 2:
                query = 'SELECT * FROM cars WHERE id = $1';
                _context3.next = 5;
                return _index2.default.query(query, [id]);

              case 5:
                car = _context3.sent;
                return _context3.abrupt('return', car);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function findCarById(_x4) {
        return _ref4.apply(this, arguments);
      }

      return findCarById;
    }()
  }, {
    key: 'findByStatus',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(status, _ref5) {
        var min = _ref5.min,
            max = _ref5.max,
            state = _ref5.state,
            manufacturer = _ref5.manufacturer;
        var statusQuery, rangeQuery, rangeStateQuery, stateQuery, minQuery, minStateQuery, maxQuery, maxStateQuery, makeQuery, CarsByStatus;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                statusQuery = 'SELECT * FROM cars WHERE status=$1';
                rangeQuery = 'SELECT * FROM cars WHERE status=$1 AND price BETWEEN $2 AND $3';
                rangeStateQuery = 'SELECT * FROM cars WHERE status=$1 AND state=$2 AND price BETWEEN $3 AND $4';
                stateQuery = 'SELECT * FROM cars WHERE status=$1 AND state=$2';
                minQuery = 'SELECT * FROM cars WHERE status=$1 AND price>=$2';
                minStateQuery = 'SELECT * FROM cars WHERE status=$1 AND price>=$2 AND state=$3';
                maxQuery = 'SELECT * FROM cars WHERE status=$1 AND price<=$2';
                maxStateQuery = 'SELECT * FROM cars WHERE status=$1 AND price<=$2 AND state=$3';
                makeQuery = 'SELECT * FROM cars WHERE status=$1 AND manufacturer=$2';
                CarsByStatus = void 0;

                if (!(!min && !max && !state && !manufacturer)) {
                  _context4.next = 16;
                  break;
                }

                _context4.next = 13;
                return _index2.default.query(statusQuery, [status]);

              case 13:
                CarsByStatus = _context4.sent;
                _context4.next = 62;
                break;

              case 16:
                if (!(!min && !max && state && !manufacturer)) {
                  _context4.next = 22;
                  break;
                }

                _context4.next = 19;
                return _index2.default.query(stateQuery, [status, state]);

              case 19:
                CarsByStatus = _context4.sent;
                _context4.next = 62;
                break;

              case 22:
                if (!(min && max && !state && !manufacturer)) {
                  _context4.next = 28;
                  break;
                }

                _context4.next = 25;
                return _index2.default.query(rangeQuery, [status, min, max]);

              case 25:
                CarsByStatus = _context4.sent;
                _context4.next = 62;
                break;

              case 28:
                if (!(min && !max && !state && !manufacturer)) {
                  _context4.next = 34;
                  break;
                }

                _context4.next = 31;
                return _index2.default.query(minQuery, [status, min]);

              case 31:
                CarsByStatus = _context4.sent;
                _context4.next = 62;
                break;

              case 34:
                if (!(!min && max && !state && !manufacturer)) {
                  _context4.next = 40;
                  break;
                }

                _context4.next = 37;
                return _index2.default.query(maxQuery, [status, max]);

              case 37:
                CarsByStatus = _context4.sent;
                _context4.next = 62;
                break;

              case 40:
                if (!(min && max && state && !manufacturer)) {
                  _context4.next = 46;
                  break;
                }

                _context4.next = 43;
                return _index2.default.query(rangeStateQuery, [status, state, min, max]);

              case 43:
                CarsByStatus = _context4.sent;
                _context4.next = 62;
                break;

              case 46:
                if (!(min && !max && state && !manufacturer)) {
                  _context4.next = 52;
                  break;
                }

                _context4.next = 49;
                return _index2.default.query(minStateQuery, [status, min, state]);

              case 49:
                CarsByStatus = _context4.sent;
                _context4.next = 62;
                break;

              case 52:
                if (!(!min && max && state && !manufacturer)) {
                  _context4.next = 58;
                  break;
                }

                _context4.next = 55;
                return _index2.default.query(maxStateQuery, [status, max, state]);

              case 55:
                CarsByStatus = _context4.sent;
                _context4.next = 62;
                break;

              case 58:
                if (!(!min && !max && !state && manufacturer)) {
                  _context4.next = 62;
                  break;
                }

                _context4.next = 61;
                return _index2.default.query(makeQuery, [status, manufacturer]);

              case 61:
                CarsByStatus = _context4.sent;

              case 62:
                return _context4.abrupt('return', CarsByStatus);

              case 63:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function findByStatus(_x5, _x6) {
        return _ref6.apply(this, arguments);
      }

      return findByStatus;
    }()
  }, {
    key: 'deleteCar',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(carId) {
        var query;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(carId === undefined)) {
                  _context5.next = 2;
                  break;
                }

                throw new _ErrorClass2.default(400, 'Please provide carID');

              case 2:
                query = 'DELETE FROM cars WHERE id=$1';

                _index2.default.query(query, [carId]);

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteCar(_x7) {
        return _ref7.apply(this, arguments);
      }

      return deleteCar;
    }()
  }, {
    key: 'findAll',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var query, cars;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                query = 'SELECT * FROM cars';
                _context6.next = 3;
                return _index2.default.query(query);

              case 3:
                cars = _context6.sent;
                return _context6.abrupt('return', cars);

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function findAll() {
        return _ref8.apply(this, arguments);
      }

      return findAll;
    }()
  }]);

  return CarService;
}();

exports.default = CarService;