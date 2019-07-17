'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default); /* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
var expect = _chai2.default.expect;


var token = void 0;

describe('AUTH ROUTE', function () {
  describe('SIGNUP ROUTE', function () {
    describe('SIGNUP SUCCESSFULLY', function () {
      it('should have a status of 201', function (done) {
        var body = {
          email: 'segunogundipe2000@yahoo.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 'qwertyuiop1234',
          address: '12 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: false
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          token = res.body.data.token;
          expect(res.body.status).to.equal(201);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITHOUT ISADMIN FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 'jhfdcthjk24r44',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE'
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH A NON BOOLEAN ISADMIN FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 'jhfdcthjk24r44',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: 'true'
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITHOUT PASSWORD FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH A NON STRING PASSWORD FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 12345678,
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: false
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH WRONG PASSWORD FORMAT', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 'WETHh2',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITHOUT GENDER FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH A NON STRING GENDER FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: true,
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH INCORRECT GENDER FORMAT', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'male',
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITHOUT EMAIL FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          isAdmin: true,
          gender: 'MALE'
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH A NON STRING EMAIL FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 12365335,
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH INCORRECT EMAIL FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenomgmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITHOUT FIRSTNAME FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          isAdmin: true,
          gender: 'MALE'
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH A NON STRING FIRSTNAME FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 1122222,
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH A NON TITLE CASE FIRSTNAME FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'SEGUN',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITHOUT LASTNAME FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          isAdmin: true,
          gender: 'MALE'
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH A NON STRING LASTNAME FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: true,
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH A NON TITLE CASE FIRSTNAME FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITHOUT ADDRESS FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          isAdmin: true,
          gender: 'MALE'
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH A NON STRING ADDRESS FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: '12345678',
          address: true,
          gender: 'MALE',
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH INCORRECT ADDRESS FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          firstName: 'SEGUN',
          lastName: 'Ogundipe',
          password: '12345678',
          address: '10 ifelodun street off otubu bus',
          gender: 'MALE',
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNUP WITH EXISTING EMAIL', function () {
      it('should have a status of 409', function (done) {
        var body = {
          email: 'segunogundipe2000@yahoo.com',
          firstName: 'Segun',
          lastName: 'Ogundipe',
          password: 'qwertyuiop1234',
          address: '10 ifelodun street off otubu bus stop. Agege Lagos, Nigeria',
          gender: 'MALE',
          isAdmin: true
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signup').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(409);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });
  });

  describe('SIGNIN ROUTE', function () {
    describe('SIGNIN SUCCESSFULLY', function () {
      it('should have a status of 200', function (done) {
        var body = {
          email: 'segunogundipe2000@yahoo.com',
          password: 'qwertyuiop1234'
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signin').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(200);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('INCORRECT PASSWORD', function () {
      it('should have a status of 401', function (done) {
        var body = {
          email: 'segunogundipe2000@yahoo.com',
          password: 'qwertyuiop'
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signin').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(401);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNIN WITHOUT EMAIL FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          password: '12345678'
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signin').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNIN WITH A NON STRING EMAIL FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: true,
          password: '12345678'
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signin').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNIN WITHOUT PASSWORD FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com'
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signin').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('SIGNIN WITH A NON STRING PASSWORD FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          email: 'davephenom@gmail.com',
          password: 12345678
        };

        _chai2.default.request(_index2.default).post('/api/v2/auth/signin').send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });
  });

  describe('TOKEN', function () {
    describe('POST CAR WITHOUT TOKEN', function () {
      it('should have a status of 401', function (done) {
        _chai2.default.request(_index2.default).post('/api/v2/car').end(function (err, res) {
          expect(res.body.status).to.equal(401);
          done();
        });
      });
    });

    describe('TOKEN WITHOUT A USER', function () {
      it('should have a status of 404', function (done) {
        _chai2.default.request(_index2.default).post('/api/v2/users/davephenom@gmail.com/resetPassword').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM4LCJpYXQiOjE1NjExMTg4MTksImV4cCI6MTU2MTIwNTIxOX0.gVW6wHojiXQajY8xzvjkl3WzKyJBsLvHg9WhpE168rE').end(function (err, res) {
          expect(res.body.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PASSWORD RESET ROUTE', function () {
    describe('PASSWORD RESET WITHOUT PASSWORD FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          newPassword: '12345566f'
        };

        _chai2.default.request(_index2.default).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('PASSWORD RESET WITH NON STRING PASSWORD FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          password: true,
          newPassword: '12345566f'
        };

        _chai2.default.request(_index2.default).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('PASSWORD RESET WITHOUT NEWPASSWORD FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          password: '12345566f'
        };

        _chai2.default.request(_index2.default).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('PASSWORD RESET WITH NON STRING NEWPASSWORD FIELD', function () {
      it('should have a status of 400', function (done) {
        var body = {
          password: 'wttyv2h36bh',
          newPassword: 12345566
        };

        _chai2.default.request(_index2.default).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('PASSWORD RESET WITH INCORRECT NEWPASSWORD FORMAT', function () {
      it('should have a status of 400', function (done) {
        var body = {
          password: 'wttyv2h36bh',
          newPassword: 'TYFDGV6'
        };

        _chai2.default.request(_index2.default).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('PASSWORD RESET WITH INCORRECT EMAIL FORMAT', function () {
      it('should have a status of 400', function (done) {
        var body = {
          password: 'wttyv2h36bh',
          newPassword: '12345566s'
        };

        _chai2.default.request(_index2.default).post('/api/v2/users/davephenomsgmail.com/resetPassword').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.a('object');
          done();
        });
      });
    });

    describe('PASSWORD UPDATE WITH INCORRECT PASSWORD', function () {
      it('should have a status of 401', function (done) {
        var body = {
          password: 'qwertyuiop12',
          newPassword: 'asdfghjkl1234'
        };

        _chai2.default.request(_index2.default).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('PASSWORD UPDATE', function () {
      it('should have a status of 204', function (done) {
        var body = {
          password: 'qwertyuiop1234',
          newPassword: 'asdfghjkl1234'
        };

        _chai2.default.request(_index2.default).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword').set('Authorization', token).send(body).end(function (err, res) {
          expect(res.status).to.equal(204);
          done();
        });
      });
    });

    describe('PASSWORD RESET WITH EMPTY BODY', function () {
      it('should have a status of 204', function (done) {
        _chai2.default.request(_index2.default).post('/api/v2/users/segunogundipe2000@yahoo.com/resetPassword').end(function (err, res) {
          expect(res.status).to.equal(204);
          expect(res.body).to.be.a('object');
          done();
        });
      }).timeout(0);
    });
  });
});