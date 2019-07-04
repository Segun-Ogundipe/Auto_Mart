/* eslint-disable class-methods-use-this */
import cloudinary from 'cloudinary';

import Error from '../models/ErrorModel';

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
const fileName = new Date().toISOString();

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

export default class ImageUploader {
  static upload(req, res, next) {
    try {
      const { image, User } = req.body;
      if (image !== undefined) {
        cloudinary.v2.uploader.upload(image, { public_id: `AutoMart/${User.id}/${fileName}` }, (error, result) => {
          if (error) {
            res.status(400).json(new Error(400, error.message));
          } else {
            req.body.image = result.secure_url;
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
