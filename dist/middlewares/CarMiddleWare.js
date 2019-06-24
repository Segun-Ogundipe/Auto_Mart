'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ErrorClass = require('../helpers/ErrorClass');

var _ErrorClass2 = _interopRequireDefault(_ErrorClass);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

var _UserService = require('../services/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

var _CarService = require('../services/CarService');

var _CarService2 = _interopRequireDefault(_CarService);

var _OrderService = require('../services/OrderService');

var _OrderService2 = _interopRequireDefault(_OrderService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarMiddleware = function () {
  function CarMiddleware() {
    _classCallCheck(this, CarMiddleware);
  }

  _createClass(CarMiddleware, null, [{
    key: 'validateCreate',
    value: function validateCreate(req, res, next) {
      try {
        var _req$body = req.body,
            owner = _req$body.owner,
            state = _req$body.state,
            price = _req$body.price,
            manufacturer = _req$body.manufacturer,
            model = _req$body.model,
            bodyType = _req$body.bodyType;

        if (owner === undefined) {
          throw new _ErrorClass2.default(400, 'owner field is required');
        } else if (typeof owner !== 'number') {
          throw new _ErrorClass2.default(400, 'owner must be a number');
        } else if (state === undefined) {
          throw new _ErrorClass2.default(400, 'state field is required');
        } else if (typeof state !== 'string') {
          throw new _ErrorClass2.default(400, 'state must be a string');
        } else if (state !== 'new' && state !== 'used') {
          throw new _ErrorClass2.default(400, 'state must either be new or used');
        } else if (price === undefined) {
          throw new _ErrorClass2.default(400, 'price field is required');
        } else if (typeof price !== 'number') {
          throw new _ErrorClass2.default(400, 'price must be a number');
        } else if (manufacturer === undefined) {
          throw new _ErrorClass2.default(400, 'manufacturer field is required');
        } else if (typeof manufacturer !== 'string') {
          throw new _ErrorClass2.default(400, 'manufacturer must be a string');
        } else if (model === undefined) {
          throw new _ErrorClass2.default(400, 'model field is required');
        } else if (typeof model !== 'string') {
          throw new _ErrorClass2.default(400, 'model must be a string');
        } else if (bodyType === undefined) {
          throw new _ErrorClass2.default(400, 'bodyType field is required');
        } else if (typeof bodyType !== 'string') {
          throw new _ErrorClass2.default(400, 'bodyType must be a string');
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'validateCarUpdate',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var carId, Car, User;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                carId = req.params.carId;
                _context.next = 4;
                return _CarService2.default.findCarById(carId);

              case 4:
                Car = _context.sent;

                if (!(Car.length < 1)) {
                  _context.next = 7;
                  break;
                }

                throw new _ErrorClass2.default(404, 'Car with id: ' + carId + ' does not exist');

              case 7:
                _context.next = 9;
                return _UserService2.default.findUserById(Car[0].userId);

              case 9:
                User = _context.sent;

                if (!(User.length < 1)) {
                  _context.next = 12;
                  break;
                }

                throw new _ErrorClass2.default(404, 'User with id: ' + Car[0].userId + ' does not exist');

              case 12:
                if (!(req.body.TokenUser.id !== User[0].id)) {
                  _context.next = 14;
                  break;
                }

                throw new _ErrorClass2.default(401, 'Logged in User is not a match with car owner');

              case 14:

                req.body.Car = Car[0];
                req.body.User = User[0];

                next();
                _context.next = 22;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context['catch'](0);

                res.status(_context.t0.status || 500).json(new _ErrorModel2.default(_context.t0.status || 500, _context.t0.message));

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 19]]);
      }));

      function validateCarUpdate(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return validateCarUpdate;
    }()
  }, {
    key: 'validateOwner',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        var _req$body2, owner, TokenUser, user;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, owner = _req$body2.owner, TokenUser = _req$body2.TokenUser;
                _context2.next = 4;
                return _UserService2.default.findUserById(owner);

              case 4:
                user = _context2.sent;

                if (!(user.length < 1)) {
                  _context2.next = 7;
                  break;
                }

                throw new _ErrorClass2.default(404, 'User with id: ' + owner + ' does not exist');

              case 7:
                if (!(TokenUser.id !== user[0].id)) {
                  _context2.next = 9;
                  break;
                }

                throw new _ErrorClass2.default(401, 'Owner is not a match with the logged in User');

              case 9:

                req.body.User = user[0];

                next();
                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2['catch'](0);

                res.status(_context2.t0.status || 500).json(new _ErrorModel2.default(_context2.t0.status || 500, _context2.t0.message));

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 13]]);
      }));

      function validateOwner(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return validateOwner;
    }()
  }, {
    key: 'validateAdmin',
    value: function validateAdmin(req, res, next) {
      try {
        var TokenUser = req.body.TokenUser;


        if (TokenUser.isAdmin !== true) {
          throw new _ErrorClass2.default(401, 'Logged in user is not an Admin');
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'validatePriceUpdate',
    value: function validatePriceUpdate(req, res, next) {
      try {
        var price = req.body.price;


        if (price === undefined) {
          throw new _ErrorClass2.default(400, 'price field is required');
        } else if (typeof price !== 'number') {
          throw new _ErrorClass2.default(400, 'price must be a number');
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }, {
    key: 'validateStatusUpdate',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
        var _req$body3, status, orderId, order, carId;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _req$body3 = req.body, status = _req$body3.status, orderId = _req$body3.orderId;

                if (!(status === undefined)) {
                  _context3.next = 6;
                  break;
                }

                throw new _ErrorClass2.default(400, 'status field is required');

              case 6:
                if (!(typeof status !== 'string')) {
                  _context3.next = 10;
                  break;
                }

                throw new _ErrorClass2.default(400, 'status must be a string');

              case 10:
                if (!(status !== 'sold')) {
                  _context3.next = 14;
                  break;
                }

                throw new _ErrorClass2.default(400, 'status must be \'sold\'');

              case 14:
                if (!(orderId === undefined)) {
                  _context3.next = 18;
                  break;
                }

                throw new _ErrorClass2.default(400, 'orderId field is required');

              case 18:
                if (!(typeof orderId !== 'number')) {
                  _context3.next = 20;
                  break;
                }

                throw new _ErrorClass2.default(400, 'orderId must be a number');

              case 20:
                _context3.next = 22;
                return _OrderService2.default.findOrderById(orderId);

              case 22:
                order = _context3.sent;
                carId = parseInt(req.params.carId, 10);

                if (!(order.length < 1)) {
                  _context3.next = 28;
                  break;
                }

                throw new _ErrorClass2.default(404, 'Order with id: ' + orderId + ' does not exist');

              case 28:
                if (!(order[0].carId !== carId)) {
                  _context3.next = 30;
                  break;
                }

                throw new _ErrorClass2.default(400, 'The accepted order was not made for this car');

              case 30:

                next();
                _context3.next = 36;
                break;

              case 33:
                _context3.prev = 33;
                _context3.t0 = _context3['catch'](0);

                res.status(_context3.t0.status || 500).json(new _ErrorModel2.default(_context3.t0.status || 500, _context3.t0.message));

              case 36:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 33]]);
      }));

      function validateStatusUpdate(_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      }

      return validateStatusUpdate;
    }()
  }, {
    key: 'validateStatus',
    value: function validateStatus(req, res, next) {
      try {
        var _req$query = req.query,
            status = _req$query.status,
            minPrice = _req$query.minPrice,
            maxPrice = _req$query.maxPrice,
            state = _req$query.state;

        var min = parseInt(minPrice, 10);
        var max = parseInt(maxPrice, 10);

        if (status === undefined) {
          throw new _ErrorClass2.default(400, 'Query param status is required');
        } else if (status !== 'available') {
          throw new _ErrorClass2.default(400, 'status must be \'available\'');
        } else if (minPrice !== undefined && isNaN(min)) {
          throw new _ErrorClass2.default(400, 'minPrice must be a number');
        } else if (maxPrice !== undefined && isNaN(max)) {
          throw new _ErrorClass2.default(400, 'maxPrice must be a number');
        } else if (state !== undefined && state !== 'new' && state !== 'used') {
          throw new _ErrorClass2.default(400, 'state must either be \'new\' or \'used\'');
        }

        next();
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }]);

  return CarMiddleware;
}();

exports.default = CarMiddleware;