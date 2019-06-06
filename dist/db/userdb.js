'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserModel = require('../models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = [];

var user = new _UserModel2.default(1, 'davephenoms@gmail.com', 'Segun', 'Ogundipe', 'Male', 'qwertyuiop1234', '12, lagos street, lagos state', true);
users.push(user);

exports.default = users;