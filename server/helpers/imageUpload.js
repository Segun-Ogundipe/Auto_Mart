/* eslint-disable class-methods-use-this */
import cloudinary from 'cloudinary';
import properties from '../config/properties';
import Error from '../models/error';

// eslint-disable-next-line camelcase
const { cloud_name, api_key, api_secret } = properties;
const fileName = new Date().toISOString();

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export default class ImageUploader {
  upload(req, res, next) {
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
  }
}
