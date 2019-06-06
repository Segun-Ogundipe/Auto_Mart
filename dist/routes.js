'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UserController = require('./controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _CarController = require('./controllers/CarController');

var _CarController2 = _interopRequireDefault(_CarController);

var _middleware = require('./helpers/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _imageUpload = require('./helpers/imageUpload');

var _imageUpload2 = _interopRequireDefault(_imageUpload);

var _OrderController = require('./controllers/OrderController');

var _OrderController2 = _interopRequireDefault(_OrderController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var tokenUtility = new _middleware2.default();
var imageUploader = new _imageUpload2.default();

// User routes
router.post('/auth/signup', _UserController2.default.create);
router.post('/auth/signin', _UserController2.default.signin);

// Car routes
router.post('/car', tokenUtility.checkToken, imageUploader.upload, _CarController2.default.create);
router.patch('/car/:carId', tokenUtility.checkToken, _CarController2.default.update);
router.get('/car/:carId', tokenUtility.checkToken, _CarController2.default.getCar);
router.get('/car', tokenUtility.checkToken, _CarController2.default.getCarsByStatus);
router.delete('/car/:carId', tokenUtility.checkToken, _CarController2.default.delete);
router.get('/cars', tokenUtility.checkToken, _CarController2.default.getAll);

// Order routes
router.post('/order/', tokenUtility.checkToken, _OrderController2.default.create);
router.patch('/order/:orderId', tokenUtility.checkToken, _OrderController2.default.updateOrder);

exports.default = router;