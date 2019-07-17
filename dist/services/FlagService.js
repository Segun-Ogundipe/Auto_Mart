'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FlagModel = require('../models/FlagModel');

var _FlagModel2 = _interopRequireDefault(_FlagModel);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlagService = function () {
  function FlagService() {
    _classCallCheck(this, FlagService);
  }

  _createClass(FlagService, null, [{
    key: 'createFlag',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(body) {
        var query, FlagData, flag;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = 'INSERT INTO flags("carId", reason, description, "createdOn") VALUES($1, $2, $3, $4) RETURNING *';
                FlagData = new _FlagModel2.default();

                FlagData.setFlagWithBody(body);

                _context.next = 5;
                return _index2.default.query(query, FlagData.getFlagAsArray());

              case 5:
                flag = _context.sent;
                return _context.abrupt('return', flag[0]);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createFlag(_x) {
        return _ref.apply(this, arguments);
      }

      return createFlag;
    }()
  }]);

  return FlagService;
}();

exports.default = FlagService;