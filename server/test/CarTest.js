/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import app from '../index';
import pool from '../services/index';
import CarService from '../services/CarService';
import CarMiddleware from '../middlewares/CarMiddleWare';
import UserService from '../services/UserService';
import OrderService from '../services/OrderService';
import CarController from '../controllers/CarController';
import ImageUploader from '../middlewares/ImageMiddleware';

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;
let request;
let carId;
let firstUserToken;
let secondUserToken;
let firstUserId;
let secondUserId;
let car;
let orderId;

describe('CAR ROUTE', () => {
  before(async function () {
    request = chai.request(app).keepOpen();
    this.timeout(0);
    const firstUser = {
      email: 'davephenoms@gmail.com',
      first_name: 'Segun',
      last_name: 'Ogundipe',
      password: 'qwertyuiop1234',
      address: '12 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
      gender: 'male',
      is_admin: true,
    };

    const secondUser = {
      email: 'segunogundipe2000@yahoo.com',
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
    secondUserId = secondUserResponse.body.data.id;
    secondUserToken = secondUserResponse.body.data.token;

    const carBody = {
      owner: firstUserId,
      state: 'new',
      price: 100000.98,
      manufacturer: 'Ford',
      model: 'F50',
      body_type: 'Truck',
      image: 'https://randomuser.me/api/portraits/men/85.jpg',
    };

    const carResponse = await request.post('/api/v2/car')
      .set('Authorization', firstUserToken)
      .send(carBody);
    car = carResponse.body.data.id;

    const order = {
      buyer: secondUserId,
      car_id: car,
      amount: 2650000.87,
    };

    const orderResponse = await request.post('/api/v2/orders')
      .set('Authorization', secondUserToken)
      .send(order);
    orderId = orderResponse.body.data.id;
  });

  afterEach(() => sinon.restore());

  after(async () => {
    const userQuery = 'DELETE FROM users WHERE id = $1';
    const carQuery = 'DELETE FROM cars WHERE id = $1';
    const orderQuery = 'DELETE FROM orders WHERE id = $1';
    await pool.query(userQuery, [firstUserId]);
    await pool.query(userQuery, [secondUserId]);
    await pool.query(carQuery, [car]);
    await pool.query(orderQuery, [orderId]);
    request.close();
  });

  describe('INDEX', () => {
    it('should have a status of 404', async () => {
      const response = await request.post('/api/v1/car');

      expect(response.body.status).to.equal(404);
    });
  });

  describe('CAR CREATE ROUTE', () => {
    describe('CREATE CAR', () => {
      it('should have a status of 201', async () => {
        const body = {
          owner: firstUserId,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          body_type: 'Truck',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        carId = response.body.data.id;
        expect(response.body.status).to.equal(201);
      });
    });

    describe('CREATE CAR WITH EMPTY IMAGE FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          owner: firstUserId,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          body_type: 'Truck',
          image: '',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE CAR WITH AN UNDEFINED OWNER FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          body_type: 'Truck',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE CAR WITH A NON NUMBER OWNER', () => {
      it('should have a status of 400', async () => {
        const body = {
          owner: '1',
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          body_type: 'Truck',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE CAR WITH INVALID OWNER', () => {
      it('should have a status of 404', async () => {
        const body = {
          owner: 0,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          body_type: 'Truck',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(404);
      });
    });

    describe('CREATE CAR WITH AN UNDEFINED STATE FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          owner: 1,
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          body_type: 'Truck',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE CAR WITH A NON STRING STATE FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          owner: 1,
          state: true,
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          body_type: 'Truck',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE CAR WITH INCORRECT STATE FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          owner: 1,
          state: 'use',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          body_type: 'Truck',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE CAR WITH UNDEFINED PRICE FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          owner: 1,
          state: 'new',
          manufacturer: 'Ford',
          model: 'F50',
          body_type: 'Truck',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE CAR WITH A NON NUMBER PRICE FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          owner: 1,
          state: 'new',
          price: '100000.98',
          manufacturer: 'Ford',
          model: 'F50',
          body_type: 'Truck',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE CAR WITH UNDEFINED MANUFACTURER FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          model: 'F50',
          body_type: 'Truck',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE CAR WITH A NON STRING MANUFACTURER FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: true,
          model: 'F50',
          body_type: 'Truck',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE CAR WITH UNDEFINED MODEL FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          body_type: 'Truck',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE CAR WITH A NON STRING MODEL FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 50,
          body_type: 'Truck',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE CAR WITH UNDEFINED BODYTYPE FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('CREATE CAR WITH A NON STRING BODYTYPE FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          body_type: 1234,
        };

        const response = await request.post('/api/v2/car')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });
  });

  describe('CAR UPDATE ROUTE', () => {
    describe('UPDATE CAR\'S PRICE', () => {
      it('should have a status of 200', async () => {
        const body = {
          price: 150000.98,
        };

        const response = await request.patch(`/api/v2/cars/${carId}/price`)
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('UPDATE CAR\'S PRICE WITH UNDEFINED PRICE FIELD', () => {
      it('should have a status of 400', async () => {
        const response = await request.patch(`/api/v2/cars/${carId}/price`)
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('UPDATE CAR\'S PRICE WITH A NON NUMBER PRICE', () => {
      it('should have a status of 400', async () => {
        const body = {
          price: '23534566',
        };

        const response = await request.patch(`/api/v2/cars/${carId}/price`)
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('UPDATE CAR\'S STATUS', () => {
      it('should have a status of 200', async () => {
        const body = {
          orderId,
          status: 'sold',
        };

        const response = await request.patch(`/api/v2/cars/${car}/status`)
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('UPDATE A SOLD CAR', () => {
      it('should have a status of 400', async () => {
        const body = {
          orderId,
          status: 'sold',
        };

        const response = await request.patch(`/api/v2/cars/${car}/status`)
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('UPDATE CAR\'S STATUS WITH UNDEFINED ORDERID FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          status: 'sold',
        };

        const response = await request.patch(`/api/v2/cars/${carId}/status`)
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('UPDATE CAR\'S STATUS WITH A NON NUMBER ORDERID', () => {
      it('should have a status of 400', async () => {
        const body = {
          orderId: '1',
          status: 'sold',
        };

        const response = await request.patch(`/api/v2/cars/${carId}/status`)
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('UPDATE CAR\'S STATUS WITH UNDEFINED STATUS FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          orderId: 1,
        };

        const response = await request.patch(`/api/v2/cars/${carId}/status`)
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('UPDATE CAR\'S STATUS WITH A NON STRING STATUS', () => {
      it('should have a status of 400', async () => {
        const body = {
          orderId: 1,
          status: true,
        };

        const response = await request.patch(`/api/v2/cars/${carId}/status`)
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('UPDATE CAR\'S STATUS WITH STATUS OTHER THAN \'SOLD\'', () => {
      it('should have a status of 400', async () => {
        const body = {
          orderId: 1,
          status: 'available',
        };

        const response = await request.patch(`/api/v2/cars/${carId}/status`)
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('UPDATE CAR\'S STATUS WITH STATUS WIH INVALID ID', () => {
      it('should have a status of 404', async () => {
        const body = {
          orderId: 1,
          status: 'available',
        };

        const response = await request.patch('/api/v2/cars/0/status')
          .set('Authorization', firstUserToken)
          .send(body);

        expect(response.body.status).to.equal(404);
      });
    });
  });

  describe('CAR STATUS ROUTE', () => {
    describe('GET ALL AVAILABLE CARS', () => {
      it('should have a status of 200', async () => {
        const response = await request.get('/api/v2/cars?status=available')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('GET ALL AVAILABLE CARS BY MINPRICE', () => {
      it('should have a status of 200', async () => {
        const response = await request.get('/api/v2/cars?status=available&minPrice=100')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('GET ALL AVAILABLE CARS BY MAXPRICE', () => {
      it('should have a status of 200', async () => {
        const response = await request.get('/api/v2/cars?status=available&maxPrice=1000000000')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('GET ALL AVAILABLE CARS BY STATE', () => {
      it('should have a status of 200', async () => {
        const response = await request.get('/api/v2/cars?status=available&state=new')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('GET ALL AVAILABLE CARS BY MANUFACTURER', () => {
      it('should have a status of 200', async () => {
        const response = await request.get('/api/v2/cars?status=available&manufacturer=Ford')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('GET ALL AVAILABLE CARS BY RANGE', () => {
      it('should have a status of 200', async () => {
        const response = await request.get('/api/v2/cars?status=available&minPrice=100&maxPrice=10000000000')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('GET ALL AVAILABLE CARS BY RANGE AND STATE', () => {
      it('should have a status of 200', async () => {
        const response = await request.get('/api/v2/cars?status=available&minPrice=100&maxPrice=10000000000&state=new')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('GET ALL AVAILABLE CARS BY MINPRICE AND STATE', () => {
      it('should have a status of 200', async () => {
        const response = await request.get('/api/v2/cars?status=available&minPrice=100&state=new')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('GET ALL AVAILABLE CARS BY MAXPRICE AND STATE', () => {
      it('should have a status of 200', async () => {
        const response = await request.get('/api/v2/cars?status=available&maxPrice=1000000000&state=new')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('GET ALL SOLD CARS', () => {
      it('should have a status of 404', async () => {
        const response = await request.get('/api/v2/cars?status=available&maxPrice=1')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(404);
      });
    });

    describe('GET ALL AVAILABLE CARS WITHOUT STATUS PARAM', () => {
      it('should have a status of 400', async () => {
        const response = await request.get('/api/v2/cars')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('GET ALL AVAILABLE CARS WITH INCORRECT STATUS PARAM', () => {
      it('should have a status of 400', async () => {
        const response = await request.get('/api/v2/cars?status=sold')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('GET ALL AVAILABLE CARS WITH INVALID MINPRICE PARAM', () => {
      it('should have a status of 400', async () => {
        const response = await request.get('/api/v2/cars?status=available&minPrice=we')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('GET ALL AVAILABLE CARS WITH INVALID MAXPRICE PARAM', () => {
      it('should have a status of 400', async () => {
        const response = await request.get('/api/v2/cars?status=available&maxPrice=we')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(400);
      });
    });

    describe('GET ALL AVAILABLE CARS WITH INVALID STATE PARAM', () => {
      it('should have a status of 400', async () => {
        const response = await request.get('/api/v2/cars?status=available&state=we')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(400);
      });
    });
  });

  describe('GET CAR ROUTE', () => {
    describe('GET CAR WITH ID', () => {
      it('should have a status of 200', async () => {
        const response = await request.get(`/api/v2/cars/${carId}`)
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('GET CAR WITH ID', () => {
      it('should have a status of 404', async () => {
        const response = await request.get('/api/v2/cars/0')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(404);
      });
    });
  });

  describe('CAR ADMIN ROUTE', () => {
    describe('VIEW ALL CARS', () => {
      it('should have a status of 200', async () => {
        const response = await request.get('/api/v2/admin/cars')
          .set('Authorization', firstUserToken);

        expect(response.body.status).to.equal(200);
      });
    });

    describe('DELETE CAR', () => {
      it('should have a status of 204', async () => {
        const response = await request.delete(`/api/v2/admin/cars/${carId}`)
          .set('Authorization', firstUserToken);

        expect(response.status).to.equal(204);
      });
    });

    describe('DELETE CAR WITH INVALID ID', () => {
      it('should have a status of 404', async () => {
        const response = await request.delete('/api/v2/admin/cars/0')
          .set('Authorization', firstUserToken);
        expect(response.status).to.equal(404);
      });
    });

    describe('VALIDATE ADMIN', () => {
      it('should have a status of 401', async () => {
        const response = await request.delete('/api/v2/admin/cars/1')
          .set('Authorization', secondUserToken);
        expect(response.status).to.equal(401);
      });
    });
  });

  describe('STUBS', () => {
    it('fakes findcarbyid', async () => {
      const req = {
        params: {
          car_id: 1,
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(CarService, 'findCarById').throws();

      await CarMiddleware.validateCarUpdate(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes finduserbyid', async () => {
      const req = {
        body: {
          owner: 1,
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(UserService, 'findUserById').throws();

      await CarMiddleware.validateOwner(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes findorderbyid', async () => {
      const req = {
        body: {
          status: 'sold',
          orderId: 1,
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(OrderService, 'findOrderById').throws();

      await CarMiddleware.validateStatusUpdate(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in status validation', async () => {
      const req = { body: {} };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'body').throws();

      await CarMiddleware.validateStatus(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in car validation', async () => {
      const req = {
        body: {
          owner: 1,
          state: 'new',
          price: 100000.98,
          manufacturer: 'Ford',
          model: 'F50',
          body_type: 'Truck',
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'body').throws();

      await CarMiddleware.validateCreate(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in price update validation', async () => {
      const req = {
        body: {
          price: 100000.98,
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'body').throws();

      await CarMiddleware.validatePriceUpdate(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error admin validation', async () => {
      const req = {
        body: {},
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'body').throws();

      await CarMiddleware.validateAdmin(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in create controller', async () => {
      const req = { body: {} };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'body').throws();

      await CarController.create(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in price update controller', async () => {
      const req = { body: {} };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'body').throws();

      await CarController.updatePrice(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in status update controller', async () => {
      const req = { body: {} };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'body').throws();

      await CarController.updateStatus(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in get car controller', async () => {
      const req = {
        params: {
          car_id: 1,
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(CarService, 'findCarById').throws();

      await CarController.getCar(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in get car by status controller', async () => {
      const req = {
        query: {
          status: 'available',
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(CarService, 'findByStatus').throws();

      await CarController.getCarsByStatus(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in car delete controller', async () => {
      const req = {
        query: {
          car_id: 1,
        },
      };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(CarService, 'findCarById').throws();

      await CarController.delete(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in get all car controller', async () => {
      const req = {};
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(CarService, 'findAll').throws();

      await CarController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(500);
    });

    it('fakes server error in get all car controller', async () => {
      const req = {};
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(CarService, 'findAll').returns([]);

      await CarController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
    });

    it('fakes server error in image upload', async () => {
      const req = { body: {} };
      const res = {
        status() {},
        json() {},
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'body').throws();

      await ImageUploader.upload(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
