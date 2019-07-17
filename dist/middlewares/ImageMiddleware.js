'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable class-methods-use-this */

// import dotenv from 'dotenv';

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _ErrorModel = require('../models/ErrorModel');

var _ErrorModel2 = _interopRequireDefault(_ErrorModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// dotenv.config();

var _process$env = process.env,
    cloudName = _process$env.cloudName,
    apiKey = _process$env.apiKey,
    apiSecret = _process$env.apiSecret;

var fileName = new Date().toISOString();

_cloudinary2.default.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

var ImageUploader = function () {
  function ImageUploader() {
    _classCallCheck(this, ImageUploader);
  }

  _createClass(ImageUploader, null, [{
    key: 'upload',
    value: function upload(req, res, next) {
      try {
        var image = req.body.image;

        if (image !== undefined) {
          _cloudinary2.default.v2.uploader.upload(image, { public_id: 'AutoMart/' + fileName }, function (error, result) {
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
      } catch (error) {
        res.status(error.status || 500).json(new _ErrorModel2.default(error.status || 500, error.message));
      }
    }
  }]);

  return ImageUploader;
}();

exports.default = ImageUploader;