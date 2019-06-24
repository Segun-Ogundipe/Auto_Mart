"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlagResponse = function FlagResponse(Flag) {
  _classCallCheck(this, FlagResponse);

  this.id = Flag.id;
  this.carId = Flag.carId;
  this.reason = Flag.reason;
  this.description = Flag.description;
  this.createdOn = Flag.createdOn;
};

exports.default = FlagResponse;