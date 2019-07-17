'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UserService = require('../services/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarResponse = function () {
  function CarResponse(isUpdate, Car, User) {
    _classCallCheck(this, CarResponse);

    this.id = Car.id;
    this.owner = User.email;
    this.manufacturer = Car.manufacturer;
    this.model = Car.model;
    this.price = Car.price;
    this.state = Car.state;
    this.status = Car.status;
    this.bodyType = Car.bodyType;
    this.imageUrl = Car.imageUrl;
    this.createdOn = Car.createdOn;
    if (isUpdate === true) {
      this.updatedOn = Car.updatedOn;
    }
  }

  // eslint-disable-next-line class-methods-use-this


  _createClass(CarResponse, null, [{
    key: 'setResponseFromCarArray',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cars) {
        var response, i, User;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                response = [];
                i = 0;

              case 2:
                if (!(i < cars.length)) {
                  _context.next = 10;
                  break;
                }

                _context.next = 5;
                return _UserService2.default.findUserById(cars[i].userId);

              case 5:
                User = _context.sent;

                response.push(new CarResponse(true, cars[i], User[0]));

              case 7:
                i += 1;
                _context.next = 2;
                break;

              case 10:
                return _context.abrupt('return', response);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setResponseFromCarArray(_x) {
        return _ref.apply(this, arguments);
      }

      return setResponseFromCarArray;
    }()
  }]);

  return CarResponse;
}();

exports.default = CarResponse;