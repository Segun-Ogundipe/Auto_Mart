"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Error = function Error(status, message) {
  _classCallCheck(this, Error);

  this.status = status;
  this.message = message;
};

exports.default = Error;