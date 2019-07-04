/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import jwt from 'jsonwebtoken';

import app from '../index';
import pool from '../services/index';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import transporter from '../helpers/nodemailer';
import TokenUtility from '../middlewares/TokenMiddleware';
import UserMiddleware from '../middlewares/UserMiddleware';

chai.use(chaiHttp);
chai.use(sinonChai);

const { expect } = chai;
let request;
let token;
let userId;

describe('AUTH ROUTE', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(async () => {
    const query = 'DELETE FROM users WHERE id = $1';
    await pool.query(query, [userId]);
    request.close();
  });

  describe('SIGNUP ROUTE', () => {
    describe('SIGNUP SUCCESSFULLY', () => {
      it('should have a status of 201', async () => {
        const body = {
          email: 'segunogundipe2000@yahoo.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 'qwertyuiop1234',
          address: '12 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: false,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        token = response.body.data.token;
        userId = response.body.data.id;
        expect(response.body.status).to.equal(201);
        expect(response.body).to.be.a('object');
      }).timeout(0);
    });

    // describe('SIGNUP WITH UNDELIVERABLE EMAIL', () => {
    //   it('should have a status of 400', async () => {
    //     const body = {
    //       email: 'segunogundipe2000@yahoo.co',
    //       firstName: 'Segun',
    //       lastName: 'Ogundipe',
    //       password: 'qwertyuiop1234',
    //       address: '12 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
    //       gender: 'MALE',
    //       isAdmin: false,
    //     };

    //     const response = await request.post('/api/v2/auth/signup').send(body);
    //     expect(response.body.status).to.equal(400);
    //     expect(response.body).to.be.a('object');
    //   }).timeout(0);
    // });

    describe('SIGNUP WITHOUT ISADMIN FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 'jhfdcthjk24r44',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH A NON BOOLEAN ISADMIN FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 'jhfdcthjk24r44',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: 'true',
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITHOUT PASSWORD FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH A NON STRING PASSWORD FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 12345678,
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: false,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH WRONG PASSWORD FORMAT', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 'WETHh2',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITHOUT GENDER FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH A NON STRING GENDER FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: true,
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH INCORRECT GENDER FORMAT', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'male',
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITHOUT EMAIL FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          isAdmin: true,
          gender: 'MALE',
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH A NON STRING EMAIL FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 12365335,
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH INCORRECT EMAIL FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenomgmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITHOUT FIRSTNAME FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          isAdmin: true,
          gender: 'MALE',
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH A NON STRING FIRSTNAME FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 1122222,
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH A NON TITLE CASE FIRSTNAME FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'SEGUN',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITHOUT LASTNAME FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          isAdmin: true,
          gender: 'MALE',
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH A NON STRING LASTNAME FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: true,
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH A NON TITLE CASE FIRSTNAME FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITHOUT ADDRESS FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          isAdmin: true,
          gender: 'MALE',
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH A NON STRING ADDRESS FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: true,
          gender: 'MALE',
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH INCORRECT ADDRESS FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus',
          gender: 'MALE',
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH EXISTING EMAIL', () => {
      it('should have a status of 409', async () => {
        const body = {
          email: 'segunogundipe2000@yahoo.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 'qwertyuiop1234',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true,
        };

        const response = await request.post('/api/v2/auth/signup').send(body);
        expect(response.body.status).to.equal(409);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNUP WITH FAKED SERVER ERROR', () => {
      it('fakes server error creating user', async () => {
        const req = {
          body: {
            email: 'segunogundipe2000@yahoo.com',
            firstName: 'Segun',
            lastName: 'Ogundipe',
            password: 'qwertyuiop1234',
            address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
            gender: 'MALE',
            isAdmin: true,
          },
        };
        const res = {
          status() {},
          json() {},
        };

        sinon.stub(res, 'status').returnsThis();
        sinon.stub(UserService, 'createUser').throws();

        await UserController.create(req, res);

        expect(res.status).to.have.been.calledWith(500);
      });
    });
  });

  describe('SIGNIN ROUTE', () => {
    describe('SIGNIN SUCCESSFULLY', () => {
      it('should have a status of 200', async () => {
        const body = {
          email: 'segunogundipe2000@yahoo.com',
          password: 'qwertyuiop1234',
        };

        const response = await request.post('/api/v2/auth/signin').send(body);
        expect(response.body.status).to.equal(200);
        expect(response.body).to.be.a('object');
      });
    });

    describe('INCORRECT PASSWORD', () => {
      it('should have a status of 401', async () => {
        const body = {
          email: 'segunogundipe2000@yahoo.com',
          password: 'qwertyuiop',
        };

        const response = await request.post('/api/v2/auth/signin').send(body);
        expect(response.body.status).to.equal(401);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNIN WITHOUT EMAIL FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          password: '12345678',
        };

        const response = await request.post('/api/v2/auth/signin').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNIN WITH A NON STRING EMAIL FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: true,
          password: '12345678',
        };

        const response = await request.post('/api/v2/auth/signin').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNIN WITHOUT PASSWORD FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
        };

        const response = await request.post('/api/v2/auth/signin').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNIN WITH A NON STRING PASSWORD FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          email: 'davephenom@gmail.com',
          password: 12345678,
        };

        const response = await request.post('/api/v2/auth/signin').send(body);
        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('SIGNIN WITH FAKED SERVER ERROR', () => {
      it('fakes server error at signin', async () => {
        const req = {
          body: {
            email: 'segunogundipe2000@yahoo.com',
            password: 'qwertyuiop1234',
          },
        };
        const res = {
          status() {},
          json() {},
        };

        sinon.stub(res, 'status').returnsThis();
        sinon.stub(UserService, 'findUserByEmail').throws();

        await UserController.signin(req, res);

        expect(res.status).to.have.been.calledWith(500);
      });
    });
  });

  describe('TOKEN', () => {
    describe('POST CAR WITHOUT TOKEN', () => {
      it('should have a status of 401', async () => {
        const response = await request.post('/api/v2/car');
        expect(response.body.status).to.equal(401);
      });
    });

    describe('TOKEN WITHOUT A USER', () => {
      it('should have a status of 404', async () => {
        const response = await request.post('/api/v2/users/davephenom@gmail.com/resetPassword')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM4LCJpYXQiOjE1NjExMTg4MTksImV4cCI6MTU2MTIwNTIxOX0.gVW6wHojiXQajY8xzvjkl3WzKyJBsLvHg9WhpE168rE');

        expect(response.body.status).to.equal(404);
      });
    });

    describe('INVALID TOKEN', () => {
      it('should have a status of 401', async () => {
        const body = {
          password: 'qwertyuiop1234',
          newPassword: 'asdfghjkl1234',
        };
        const response = await request.post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey2VySWQiOjM4LCJpYXQiOjE1NjExMTg4MTksImV4cCI6MTU2MTIwNTIxOX0.gVW6wHojiXQajY8xzvjkl3WzKyJBsLvHg9WhpE168rE')
          .send(body);

        expect(response.body.status).to.equal(401);
      });
    });
  });

  describe('PASSWORD RESET ROUTE', () => {
    describe('PASSWORD RESET WITHOUT PASSWORD FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          newPassword: '12345566f',
        };

        const response = await request.post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', token)
          .send(body);

        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('PASSWORD RESET WITH NON STRING PASSWORD FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          password: true,
          newPassword: '12345566f',
        };

        const response = await request.post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', token)
          .send(body);

        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('PASSWORD RESET WITHOUT NEWPASSWORD FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          password: '12345566f',
        };

        const response = await request.post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', token)
          .send(body);

        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('PASSWORD RESET WITH NON STRING NEWPASSWORD FIELD', () => {
      it('should have a status of 400', async () => {
        const body = {
          password: 'wttyv2h36bh',
          newPassword: 12345566,
        };

        const response = await request.post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', token)
          .send(body);

        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('PASSWORD RESET WITH INCORRECT NEWPASSWORD FORMAT', () => {
      it('should have a status of 400', async () => {
        const body = {
          password: 'wttyv2h36bh',
          newPassword: 'TYFDGV6',
        };

        const response = await request.post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', token)
          .send(body);

        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('PASSWORD RESET WITH INCORRECT EMAIL FORMAT', () => {
      it('should have a status of 400', async () => {
        const body = {
          password: 'wttyv2h36bh',
          newPassword: '12345566s',
        };

        const response = await request.post('/api/v2/users/davephenomsgmail.com/resetPassword')
          .set('Authorization', token)
          .send(body);

        expect(response.body.status).to.equal(400);
        expect(response.body).to.be.a('object');
      });
    });

    describe('PASSWORD UPDATE WITH INCORRECT PASSWORD', () => {
      it('should have a status of 401', async () => {
        const body = {
          password: 'qwertyuiop12',
          newPassword: 'asdfghjkl1234',
        };

        const response = await request.post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', token)
          .send(body);

        expect(response.status).to.equal(401);
      });
    });

    describe('PASSWORD UPDATE', () => {
      it('should have a status of 204', async () => {
        const body = {
          password: 'qwertyuiop1234',
          newPassword: 'asdfghjkl1234',
        };

        const response = await request.post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword')
          .set('Authorization', `Bearer ${token}`)
          .send(body);

        expect(response.status).to.equal(204);
      });
    });

    describe('PASSWORD RESET WITH EMPTY BODY', () => {
      it('should have a status of 204', async () => {
        const response = await request.post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword');

        console.log(response);
        expect(response.status).to.equal(204);
      }).timeout(0);
    });

    describe('PASSWORD UPDATE WITH FAKED SERVER ERROR', () => {
      it('fakes server error updating password', async () => {
        const req = {
          body: {
            password: 'qwertyuiop1234',
            newPassword: 'asdfghjkl1234',
          },
        };
        const res = {
          status() {},
          json() {},
        };

        sinon.stub(res, 'status').returnsThis();

        await UserController.updatePassword(req, res);
        expect(res.status).to.have.been.calledWith(500);
      });

      it('fakes server error resetting password', async () => {
        const req = { body: {} };
        const res = {
          status() {},
          json() {},
        };

        sinon.stub(res, 'status').returnsThis();
        sinon.stub(transporter, 'sendMail').throws();

        await UserController.resetPassword(req, res);
        expect(res.status).to.have.been.calledWith(500);
      });

      it('fakes server error while parsing token', async () => {
        const req = { body: {} };
        const res = {
          status() {},
          json() {},
        };

        sinon.stub(res, 'status').returnsThis();
        sinon.stub(jwt, 'verify').throws();

        await TokenUtility.checkToken(req, res);
        expect(res.status).to.have.been.calledWith(500);
      });

      it('fakes server error while verifying token', async () => {
        const req = {
          headers: {
            authorization: token,
          },
        };
        const res = {
          status() {},
          json() {},
        };

        sinon.stub(res, 'status').returnsThis();
        sinon.stub(UserService, 'findUserByEmail').throws();

        await TokenUtility.checkToken(req, res);
        expect(res.status).to.have.been.calledWith(500);
      });

      it('fakes server error while validating password change', async () => {
        const req = {
          body: {
            password: 'qwertyuiop',
            newPassword: 'asdfghjkl',
          },
        };
        const res = {
          status() {},
          json() {},
        };

        sinon.stub(res, 'status').returnsThis();
        sinon.stub(req, 'body').throws();

        await UserMiddleware.validatePasswordChange(req, res);
        expect(res.status).to.have.been.calledWith(500);
      });

      it('fakes server error while validating update email', async () => {
        const req = {
          params: {
            email: 'davephenoms@gmail.com',
          },
        };
        const res = {
          status() {},
          json() {},
        };

        sinon.stub(res, 'status').returnsThis();
        sinon.stub(UserService, 'findUserByEmail').throws();

        await UserMiddleware.validateUpdateEmail(req, res);
        expect(res.status).to.have.been.calledWith(500);
      });

      it('fakes server error while validating login', async () => {
        const req = {
          body: {
            password: 'qwertyuiop',
            email: 'davephenoms@gmail.com',
          },
        };
        const res = {
          status() {},
          json() {},
        };

        sinon.stub(res, 'status').returnsThis();
        sinon.stub(req, 'body').throws();

        await UserMiddleware.validateLogin(req, res);
        expect(res.status).to.have.been.calledWith(500);
      });

      it('fakes server error while validating user', async () => {
        const req = {
          body: {
            email: 'davephenoms@gmail.com',
          },
        };
        const res = {
          status() {},
          json() {},
        };

        sinon.stub(res, 'status').returnsThis();
        sinon.stub(req, 'body').throws();

        await UserMiddleware.validateUser(req, res);
        expect(res.status).to.have.been.calledWith(500);
      });

      it('fakes server error while validating password', async () => {
        const req = {
          body: {
            password: 'qwertyuiop',
          },
        };
        const res = {
          status() {},
          json() {},
        };

        sinon.stub(res, 'status').returnsThis();
        sinon.stub(req, 'body').throws();

        await UserMiddleware.validatePassword(req, res);
        expect(res.status).to.have.been.calledWith(500);
      });

      it('fakes server error while validating password change', async () => {
        const req = {
          body: {
            email: 'davephenoms@gmail.com',
          },
        };
        const res = {
          status() {},
          json() {},
        };

        sinon.stub(res, 'status').returnsThis();
        sinon.stub(req, 'body').throws();

        await UserMiddleware.validateEmail(req, res);
        expect(res.status).to.have.been.calledWith(500);
      });

      it('fakes server error while validating signup', async () => {
        const req = {
          body: {
            email: 'davephenoms@gmail.com',
            firstName: 'Segun',
            lastName: 'Ogundipe',
            gender: 'MALE',
            password: 'qwertyuiop',
            address: '123 Some Street. Agege Lagos, Nigeria',
            isAdmin: true,
          },
        };
        const res = {
          status() {},
          json() {},
        };

        sinon.stub(res, 'status').returnsThis();
        sinon.stub(req, 'body').throws();

        await UserMiddleware.validateSignup(req, res);
        expect(res.status).to.have.been.calledWith(500);
      });
    });
  });
});
