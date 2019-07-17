"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Flag = function () {
  function Flag(id, carId, reason, description) {
    _classCallCheck(this, Flag);

    this.id = id;
    this.carId = carId;
    this.reason = reason;
    this.description = description;
    this.createdOn = new Date();
  }

  _createClass(Flag, [{
    key: "setFlagWithBody",
    value: function setFlagWithBody(body) {
      this.carId = body.carId;
      this.reason = body.reason;
      this.description = body.description;
    }
  }, {
    key: "getFlagAsArray",
    value: function getFlagAsArray() {
      return [this.carId, this.reason, this.description, this.createdOn];
    }
  }]);

  return Flag;
}();

exports.default = Flag;