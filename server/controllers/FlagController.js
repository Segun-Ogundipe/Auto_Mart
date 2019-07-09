import FlagService from '../services/FlagService';
import Response from '../models/ResponseModel';
import FlagResponse from '../models/FlagResponse';

export default class FlagController {
  static async create(req, res) {
    try {
      const Flag = await FlagService.createFlag(req.body);

      res.status(201).json(new Response(true, 201, new FlagResponse(Flag)));
    } catch (error) {
      res.status(error.status || 500).json(new Response(false, error.status || 500, error.message));
    }
  }
}
