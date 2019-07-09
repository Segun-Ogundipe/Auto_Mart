/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import app from '../index';
import pool from '../services/index';
import CarService from '../services/CarService';
import OrderMiddleware from '../middlewares/OrderMiddleware';
import OrderService from '../services/OrderService';
import OrderController from '../controllers/OrderController';

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;

let request;
let orderId;
let firstUserToken;
let secondUserToken;
let firstUserId;
let secondUserId;
let carId;

describe('ORDER ROUTE', () => {
  before(async function() {
    this.timeout(0);
    request = chai.request(app).keepOpen();

    const firstUser = {
      email: 'segunogundipe2000@yahoo.com',
      first_name: 'Segun',
      last_name: 'Ogundipe',
      password: 'qwertyuiop1234',
      address: '12 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
      gender: 'male',
      is_admin: false,
    };

    const secondUser = {
      email: 'davephenoms@gmail.com',
      first_name: 'Segun',
      last_name: 'Ogundipe',
      password: 'qwertyuiop1234',
      address: '12 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
      gender: 'male',
      is_admin: false,
    };

    const firstUserResponse = await request.post('/api/v2/auth/signup')
      .send(firstUser);
    firstUserToken = firstUserResponse.body.data.token;
    firstUserId = firstUserResponse.body.data.id;

    const secondUserResponse = await request.post('/api/v2/auth/signup')
      .send(secondUser);
    secondUserToken = secondUserResponse.body.data.token;
    secondUserId = secondUserResponse.body.data.id;

    const carBody = {
      owner: secondUserId,
      state: 'new',
      price: 100000.98,
      manufacturer: 'Ford',
      model: 'F50',
      body_type: 'Truck',
    };

    const carResponse = await request.post('/api/v2/car')
      .set('Authorization', secondUserToken)
      .send(carBody);
    carId = carResponse.body.data.id;
  });

  afterEach(() => sinon.restore());

  after(async () => {
    const userQuery = 'DELETE FROM users WHERE id = $1';
    const orderQuery = 'DELETE FROM orders WHERE id = $1';
    const carQuery = 'DELETE FROM cars WHERE id = $1';
    await pool.query(userQuery, [firstUserId]);
    await pool.query(userQuery, [secondUserId]);
    await pool.query(orderQuery, [orderId]);
    await pool.query(carQuery, [carId]);
    request.close();
  });

  describe('CREATE ORDER', () => {
    describe('CREATE ORDER SUCCESSFULLY', () => {
      it('should have a status of 201', async () => {
        const body = {
          buyer: firstUserId,
          carId,
          amount: 2650000.87,
        };

        const response = await request.post('/api/v2/orders')
          .set('Authorization', firstUserToken)
          .send(body);

        orderId = response.body.data.id;
        expect(response.body.status).to.equal(201);
      });
    });

    describe('CREATE ORDER WITH UNDEFINED BUYER FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          carId: 1,
          amount: 2650000.87,
        };

        const response = await request.post('/api/v2/orders')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE ORDER WITH NON NUMBER BUYER', () => {
      it('should have a status of 400', async () => {
        const body = {
          buyer: '1',
          carId: 1,
          amount: 2650000.87,
        };

        const response = await request.post('/api/v2/orders')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE ORDER WITH UNDEFINED CARID FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          buyer: 1,
          amount: 2650000.87,
        };

        const response = await request.post('/api/v2/orders')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE ORDER WITH NON NUMBER CARID', () => {
      it('should have a status of 400', async () => {
        const body = {
          buyer: 1,
          carId: '1',
          amount: 2650000.87,
        };

        const response = await request.post('/api/v2/orders')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE ORDER WITH UNDEFINED AMOUNT FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          carId: 1,
          buyer: 1,
        };

        const response = await request.post('/api/v2/orders')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE ORDER WITH NON NUMBER AMOUNT', () => {
      it('should have a status of 400', async () => {
        const body = {
          buyer: 1,
          carId: 1,
          amount: '2650000.87',
        };

        const response = await request.post('/api/v2/orders')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE ORDER WITH NON EXISTENCE BUYER', () => {
      it('should have a status of 404', async () => {
        const body = {
          buyer: 0,
          carId: 2,
          amount: 2650000.87,
        };

        const response = await request.post('/api/v2/orders')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(404);
      });
    });
  });

  describe('ORDER UPDATE ROUTE', () => {
    describe('UPDATE ORDER', () => {
      it('should have a status of 200', async () => {
        const body = {
          price: 3650000.87,
        };

        const response = await request.patch(`/api/v2/orders/${orderId}/price`)
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('UPDATE ORDER WITH UNDEFINED PRICE FIELD', () => {
      it('should have a status of 400', async () => {
        const response = await request.patch(`/api/v2/orders/${orderId}/price`)
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('UPDATE ORDER WITH A NON NUMBER PRICE', () => {
      it('should have a status of 400', async () => {
        const body = {
          price: '3650000.87',
        };

        const response = await request.patch(`/api/v2/orders/${orderId}/price`)
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('UPDATE ORDER WITH INVALID ID', () => {
      it('should have a status of 404', async () => {
        const body = {
          price: 3650000.87,
        };

        const response = await request.patch('/api/v2/orders/0/price')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(404);
      });
    });
  });

  describe('STUBS', () => {
    it('fakes server error in order validation', async () => {
      const req = {
        body: {
          buyer: 1,
          carId: 1,
          amount: 120999,
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(CarService, 'findCarById').throws();

      await OrderMiddleware.validateCreate(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in update validation', async () => {
      const req = {
        body: {
          price: 123456,
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'body').throws();

      await OrderMiddleware.validateUpdate(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in buyer validation', async () => {
      const req = {
        body: {
          buyer: 1,
          carId: 1,
          amount: 120999,
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(OrderService, 'findOrderById').throws();

      await OrderMiddleware.validateBuyer(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in create order controller', async () => {
      const req = {
        body: {
          buyer: 1,
          carId: 1,
          amount: 120999,
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'body').throws();

      await OrderController.create(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in update order controller', async () => {
      const req = {
        body: {
          amount: 120999,
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'body').throws();

      await OrderController.updateOrder(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
