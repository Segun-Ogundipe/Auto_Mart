'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */


var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _properties = require('../config/properties');

var _properties2 = _interopRequireDefault(_properties);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// eslint-disable-next-line camelcase
var cloud_name = _properties2.default.cloud_name,
    api_key = _properties2.default.api_key,
    api_secret = _properties2.default.api_secret;

var fileName = new Date().toISOString();

_cloudinary2.default.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret
});

var ImageUploader = function () {
  function ImageUploader() {
    _classCallCheck(this, ImageUploader);
  }

  _createClass(ImageUploader, [{
    key: 'upload',
    value: function upload(req, res, next) {
      if (req.body.image) {
        _cloudinary2.default.v2.uploader.upload(req.body.image, { public_id: 'AutoMart/' + fileName }, function (error, result) {
          if (error) {
            res.status(400).json(new _ErrorModel2.default(400, error.message));
          } else {
            req.body.image = result.url;
            next();
          }
        });
      } else {
        next();
      }
    }
  }]);

  return ImageUploader;
}();

exports.default = ImageUploader;