import Error from '../models/ErrorModel';
import FlagService from '../services/FlagService';
import Success from '../models/SuccessModel';
import FlagResponse from '../models/FlagResponse';

export default class FlagController {
  static async create(req, res) {
    try {
      const Flag = await FlagService.createFlag(req.body);

      res.status(201).json(new Success(201, new FlagResponse(Flag)));
    } catch (error) {
      res.status(error.status || 500).json(new Error(error.status || 500, error.message));
    }
  }
}
