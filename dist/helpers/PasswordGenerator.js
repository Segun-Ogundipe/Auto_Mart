'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PasswordGenerator = function () {
  function PasswordGenerator() {
    _classCallCheck(this, PasswordGenerator);
  }

  _createClass(PasswordGenerator, null, [{
    key: 'generate',
    value: function generate() {
      var upper = 'ABCDEFGHIJKLMNOPQRSTUVWSYZ';
      var lower = upper.toLowerCase();
      var digits = '0123456789@*#';
      var alphanumeric = upper + lower + digits;
      var password = '';
      var alphaNumLength = alphanumeric.length;

      var length = Math.floor(Math.random() * (16 - 7) + 7);

      for (var i = 0; i < length; i += 1) {
        password += alphanumeric.charAt(Math.floor(Math.random() * alphaNumLength));
      }

      return password;
    }
  }]);

  return PasswordGenerator;
}();

exports.default = PasswordGenerator;