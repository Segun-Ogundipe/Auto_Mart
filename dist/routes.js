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

var _TokenMiddleware = require('./middlewares/TokenMiddleware');

var _TokenMiddleware2 = _interopRequireDefault(_TokenMiddleware);

var _ImageMiddleware = require('./middlewares/ImageMiddleware');

var _ImageMiddleware2 = _interopRequireDefault(_ImageMiddleware);

var _OrderController = require('./controllers/OrderController');

var _OrderController2 = _interopRequireDefault(_OrderController);

var _CarMiddleWare = require('./middlewares/CarMiddleWare');

var _CarMiddleWare2 = _interopRequireDefault(_CarMiddleWare);

var _OrderMiddleware = require('./middlewares/OrderMiddleware');

var _OrderMiddleware2 = _interopRequireDefault(_OrderMiddleware);

var _UserMiddleware = require('./middlewares/UserMiddleware');

var _UserMiddleware2 = _interopRequireDefault(_UserMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// User routes
router.post('/auth/signup', _UserMiddleware2.default.validateSignup, _UserMiddleware2.default.validateEmail, _UserMiddleware2.default.validatePassword, _UserMiddleware2.default.validateUser, _UserController2.default.create);
router.post('/auth/signin', _UserMiddleware2.default.validateLogin, _UserMiddleware2.default.validateEmail, _UserMiddleware2.default.validatePassword, _UserController2.default.signin);

// Car routes
router.post('/car', _TokenMiddleware2.default.checkToken, _CarMiddleWare2.default.validateCreate, _ImageMiddleware2.default.upload, _CarController2.default.create);
router.patch('/car/:carId', _TokenMiddleware2.default.checkToken, _CarController2.default.update);
router.get('/car/:carId', _TokenMiddleware2.default.checkToken, _CarController2.default.getCar);
router.get('/car', _TokenMiddleware2.default.checkToken, _CarController2.default.getCarsByStatus);
router.delete('/car/:carId', _TokenMiddleware2.default.checkToken, _CarController2.default.delete);
router.get('/cars', _TokenMiddleware2.default.checkToken, _CarController2.default.getAll);

// Order routes
router.post('/order/', _TokenMiddleware2.default.checkToken, _OrderMiddleware2.default.validateCreate, _OrderController2.default.create);
router.patch('/order/:orderId', _TokenMiddleware2.default.checkToken, _OrderController2.default.updateOrder);

exports.default = router;