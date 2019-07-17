'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transporter = _nodemailer2.default.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.email,
    pass: process.env.pass
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.default = transporter;