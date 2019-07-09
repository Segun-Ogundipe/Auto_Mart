/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import app from '../index';
import FlagMiddleware from '../middlewares/FlagMiddleware';
import CarService from '../services/CarService';
import FlagService from '../services/FlagService';
import FlagController from '../controllers/FlagController';
import pool from '../services/index';

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;
let request;
let flagId;
let token;
let id;
let userId;

describe('FLAG ROUTE TEST', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
    const user = {
      email: 'davephenoms@gmail.com',
      first_name: 'Segun',
      last_name: 'Ogundipe',
      password: 'qwertyuiop1234',
      address: '12 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
      gender: 'male',
      is_admin: true,
    };

    const userResponse = await request.post('/api/v2/auth/signup')
      .send(user);
    token = userResponse.body.data.token;
    userId = userResponse.body.data.id;

    const car = {
      owner: userId,
      state: 'new',
      price: 100000.98,
      manufacturer: 'Ford',
      model: 'F50',
      body_type: 'Truck',
    };

    const carResponse = await request.post('/api/v2/car')
      .set('Authorization', token)
      .send(car);
    id = carResponse.body.data.id;
  });

  afterEach(() => sinon.restore());

  after(async () => {
    const flagQuery = 'DELETE FROM flags WHERE id = $1';
    const userQuery = 'DELETE FROM users WHERE id = $1';
    const carQuery = 'DELETE FROM cars WHERE id = $1';
    await pool.query(flagQuery, [flagId]);
    await pool.query(userQuery, [userId]);
    await pool.query(carQuery, [id]);
    request.close();
  });

  describe('CREATE FLAG', () => {
    it('should have a status of 201', async () => {
      const body = {
        car_id: id,
        reason: 'Bad price',
        description: 'The price is too high',
      };

      const response = await request.post('/api/v2/flags').send(body);
      flagId = response.body.data.id;
      expect(response.status).to.equal(201);
    });
  });

  describe('CREATE FLAG WITH UNDEFINED CARID FIELD', () => {
    it('should ha a status of 400', async () => {
      const body = {
        reason: 'Bad price',
        description: 'The price is too high',
      };

      const response = await request.post('/api/v2/flags').send(body);
      expect(response.status).to.equal(400);
    });
  });

  describe('CREATE FLAG WITH UNDEFINED CARID FIELD', () => {
    it('should ha a status of 400', async () => {
      const body = {
        reason: 'Bad price',
        description: 'The price is too high',
      };

      const response = await request.post('/api/v2/flags').send(body);
      expect(response.status).to.equal(400);
    });
  });

  describe('CREATE FLAG WITH NON NUMBER CARID FIELD', () => {
    it('should ha a status of 400', async () => {
      const body = {
        car_id: '1',
        reason: 'Bad price',
        description: 'The price is too high',
      };

      const response = await request.post('/api/v2/flags').send(body);
      expect(response.status).to.equal(400);
    });
  });

  describe('CREATE FLAG WITH UNDEFINED REASON FIELD', () => {
    it('should ha a status of 400', async () => {
      const body = {
        car_id: 1,
        description: 'The price is too high',
      };

      const response = await request.post('/api/v2/flags').send(body);
      expect(response.status).to.equal(400);
    });
  });

  describe('CREATE FLAG WITH NON STRING REASON FIELD', () => {
    it('should ha a status of 400', async () => {
      const body = {
        car_id: '1',
        reason: true,
        description: 'The price is too high',
      };

      const response = await request.post('/api/v2/flags').send(body);
      expect(response.status).to.equal(400);
    });
  });

  describe('CREATE FLAG WITH UNDEFINED DESCRIPTION FIELD', () => {
    it('should ha a status of 400', async () => {
      const body = {
        car_id: 1,
        reason: 'Bad price',
      };

      const response = await request.post('/api/v2/flags').send(body);
      expect(response.status).to.equal(400);
    });
  });

  describe('CREATE FLAG WITH NON STRING DESCRIPTION FIELD', () => {
    it('should ha a status of 400', async () => {
      const body = {
        car_id: 1,
        reason: 'Bad price',
        description: false,
      };

      const response = await request.post('/api/v2/flags').send(body);
      expect(response.status).to.equal(400);
    });
  });

  describe('CREATE FLAG WITH NON EXISTENCE CARID', () => {
    it('should have a status of 404', async () => {
      const body = {
        car_id: 0,
        reason: 'Bad price',
        description: 'The price is too high',
      };

      const response = await request.post('/api/v2/flags').send(body);
      expect(response.status).to.equal(404);
    });
  });

  describe('CREATE FLAG WITH FAKED SERVER ERROR', () => {
    it('fakes server error validating flag', async () => {
      const req = {
        body: {
          car_id: 1,
          reason: 'Bad price',
          description: 'The price is too high',
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(CarService, 'findCarById').throws();

      await FlagMiddleware.validateFlag(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error creating flag', async () => {
      const req = {
        body: {
          car_id: 1,
          reason: 'Bad price',
          description: 'The price is too high',
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(FlagService, 'createFlag').throws();

      await FlagController.create(req, res);

      expect(res.status).to.have.be.calledWith(500);
    });
  });
});
