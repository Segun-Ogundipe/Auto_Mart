import Flag from '../models/FlagModel';
import pool from './index'

export default class FlagService {
  static async createFlag(body) {
    const query = 'INSERT INTO flags("carId", reason, description, "createdOn") VALUES($1, $2, $3, $4) RETURNING *';
    const FlagData = new Flag();
    FlagData.setFlagWithBody(body);

    const flag = await pool.query(query, FlagData.getFlagAsArray());

    return flag[0];
  }
}
