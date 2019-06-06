'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = [];

var user = new _userModel2.default(1, 'davephenoms@gmail.com', 'Segun', 'Ogundipe', 'Male', 'qwertyuiop1234', '12, lagos street, lagos state', true);
users.push(user);

exports.default = users;