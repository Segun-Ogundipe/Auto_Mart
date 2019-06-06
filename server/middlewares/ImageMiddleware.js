/* eslint-disable class-methods-use-this */
import cloudinary from 'cloudinary';

import properties from '../config/properties';
import Error from '../models/ErrorModel';

// eslint-disable-next-line camelcase
const { cloud_name, api_key, api_secret } = properties;
const fileName = new Date().toISOString();

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export default class ImageUploader {
  static upload(req, res, next) {
    try {
      if (req.body.image) {
        cloudinary.v2.uploader.upload(req.body.image, { public_id: `AutoMart/${fileName}` }, (error, result) => {
          if (error) {
            res.status(400).json(new Error(400, error.message));
          } else {
            req.body.image = result.url;
            next();
          }
        });
      } else {
        next();
      }
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
