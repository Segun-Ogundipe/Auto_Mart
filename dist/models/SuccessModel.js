"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Success = function Success(status, data) {
  _classCallCheck(this, Success);

  this.status = status;
  this.data = data;
};

exports.default = Success;