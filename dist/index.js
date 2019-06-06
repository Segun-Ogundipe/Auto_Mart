'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _ErrorModel = require('./models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));

app.use('/api/v1', _routes2.default);

app.use('*', function (req, res) {
  res.status(404).json(new _ErrorModel2.default(404, 'You typed in the wrong URL'));
});

var PORT = 3000;

app.listen(PORT, function () {
  return console.log('App running on port: ' + PORT);
});

exports.default = app;