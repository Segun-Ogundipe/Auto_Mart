'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

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

var _swagger = require('./docs/swagger');

var _swagger2 = _interopRequireDefault(_swagger);

var _FlagController = require('./controllers/FlagController');

var _FlagController2 = _interopRequireDefault(_FlagController);

var _FlagMiddleware = require('./middlewares/FlagMiddleware');

var _FlagMiddleware2 = _interopRequireDefault(_FlagMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Documentation
router.use('/', _swaggerUiExpress2.default.serve);
router.get('/', _swaggerUiExpress2.default.setup(_swagger2.default));

// User routes
router.post('/auth/signup', _UserMiddleware2.default.validateSignup, _UserMiddleware2.default.validateEmail, _UserMiddleware2.default.verifyEmail, _UserMiddleware2.default.validatePassword, _UserMiddleware2.default.validateUser, _UserController2.default.create);
router.post('/auth/signin', _UserMiddleware2.default.validateLogin, _UserMiddleware2.default.validateEmail, _UserMiddleware2.default.validatePassword, _UserController2.default.signin);
router.post('/users/:email/resetPassword', _UserMiddleware2.default.validateUpdateEmail, _UserController2.default.resetPassword, _TokenMiddleware2.default.checkToken, _UserMiddleware2.default.validatePasswordChange, _UserMiddleware2.default.validatePassword, _UserController2.default.updatePassword);

// Car routes
router.post('/car', _TokenMiddleware2.default.checkToken, _CarMiddleWare2.default.validateCreate, _CarMiddleWare2.default.validateOwner, _ImageMiddleware2.default.upload, _CarController2.default.create);
router.patch('/cars/:carId/price', _TokenMiddleware2.default.checkToken, _CarMiddleWare2.default.validateCarUpdate, _CarMiddleWare2.default.validatePriceUpdate, _CarController2.default.updatePrice);
router.patch('/cars/:carId/status', _TokenMiddleware2.default.checkToken, _CarMiddleWare2.default.validateCarUpdate, _CarMiddleWare2.default.validateStatusUpdate, _CarController2.default.updateStatus);
router.get('/cars/:carId', _CarController2.default.getCar);
router.get('/cars', _CarMiddleWare2.default.validateStatus, _CarController2.default.getCarsByStatus);
router.delete('/admin/cars/:carId', _TokenMiddleware2.default.checkToken, _CarMiddleWare2.default.validateAdmin, _CarController2.default.delete);
router.get('/admin/cars', _TokenMiddleware2.default.checkToken, _CarMiddleWare2.default.validateAdmin, _CarController2.default.getAll);

// Order routes
router.post('/orders', _TokenMiddleware2.default.checkToken, _OrderMiddleware2.default.validateCreate, _OrderController2.default.create);
router.patch('/orders/:orderId/price', _TokenMiddleware2.default.checkToken, _OrderMiddleware2.default.validateUpdate, _OrderMiddleware2.default.validateBuyer, _OrderController2.default.updateOrder);

// Flag routes
router.post('/flags', _FlagMiddleware2.default.validateFlag, _FlagController2.default.create);

exports.default = router;