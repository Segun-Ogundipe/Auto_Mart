'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mail = function Mail(to, text) {
  _classCallCheck(this, Mail);

  this.from = 'AutoMart:';
  this.to = to;
  this.subject = 'Your new Password';
  this.text = 'Your new password is: ' + text;
};

exports.default = Mail;